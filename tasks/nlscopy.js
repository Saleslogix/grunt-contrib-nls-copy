/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

'use strict';

module.exports = function(grunt) {
    var util = require('util'),
        exec = require('child_process').exec,
        path = require('path'),
        Q = require('q');

    grunt.registerMultiTask('nlscopy', 'Copies root NLS strings to different folder.', function() {
        var options, done, files, tfsCheckoutPromises = [], fileWritePromises = [], tfsCheckinPromises = [];
        options = this.options();
        done = this.async();

        grunt.log.debug(util.inspect(options));

        global.dojoConfig = {
            baseUrl: '.',
            packages: [
                {name: 'dojo', location: options.dojo.src},
                {name: 'Sage', location: options.jscript.src}
            ]
        };

        grunt.log.debug(path.resolve(options.dojo.src, 'dojo.js'));
        require(path.resolve(options.dojo.src, 'dojo.js'));

        files = getAllFilePaths(this.files);
        files.forEach(function(filepath) {
            var filedir, outfile, filename;

            filedir = path.dirname(filepath);
            filename = path.basename(filepath);
            outfile = path.normalize(filedir + '/en/' + filename);

            tfsCheckoutPromises.push(tfsOp(options.tfbin, outfile, 'checkout'));
        });

        Q.allSettled(tfsCheckoutPromises)
            .then(function() {
                // Completion of checkout
                files.forEach(function(filepath) {
                    var filedir, outfile, filename;

                    filedir = path.dirname(filepath);
                    filename = path.basename(filepath);
                    outfile = path.normalize(filedir + '/en/' + filename);

                    fileWritePromises.push(writeNLSBundle(filepath, outfile));
                });

                return Q.allSettled(fileWritePromises);
            }, function(error) {
                grunt.log.error(error);
            })
            .then(function() {
                // Do a recursive checkin on all the *.js nls files
                if (!options.skipCheckin) {
                    tfsCheckinPromises.push(tfsOp(options.tfbin, '*.js', 'checkin', '/recursive /comment:\"NLS Bundle Update\" /noprompt /override:\"grunt-contrib-nls-copy: Version Update\"'));
                }

                return Q.allSettled(tfsCheckinPromises);
            }, function(error) {
                grunt.log.error(error);
            })
            .then(function() {
                // Completion of checkin
                done(true);
            }, function(error) {
                // Checkin error
                grunt.log.error(error);
            });

        function getAllFilePaths(files) {
            var results = [];
            files.forEach(function(file) {
                file.src.forEach(function(filepath) {
                    results.push(filepath);
                });
            });

            return results;
        }

        function tfsOp(tfbin, outfile, operation, flags) {
            var deferred = Q.defer(),
                child;
            child = exec([path.normalize('"' + tfbin + '"'), operation, flags, outfile].join(' '), function(error, stdout, stderr) {
                if (error) {
                    grunt.log.error('Error' + error);
                    deferred.reject(new Error(error));
                } else {
                    deferred.resolve(stdout);
                }

                child.kill();
            });

            return deferred.promise;
        }

        function writeNLSBundle(filepath, outfile) {
            var deferred = Q.defer();
            global.require([filepath, 'dojo/json'], function(nls, json) {
                var p, results = [], content;
                results = util.inspect(nls.root);
                content = [
                    'define((',
                    results,
                    '));'
                ];

                grunt.file.write(outfile, content.join('\r\n'));
                //grunt.log.ok('Wrote file: ' + outfile);
                deferred.resolve(outfile);
            });

            return deferred.promise;
        }
    });
}

