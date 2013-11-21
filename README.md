grunt-contrib-nls-copy
======================

Copies files from root dojo NLS bundles into the EN folder.


Example Gruntfile.js:
```
module.exports = function(grunt) { 
    grunt.initConfig({
        nlscopy: {
            options: {
                tfbin: 'C:/Program Files (x86)/Microsoft Visual Studio 11.0/Common7/IDE/TF.exe',
                dojo: {
                    src: '../Libraries/dojo_slx/dojo/'
                },
                jscript: {
                    src: '../Sage/SalesLogix/Client/WebCommon/jscript/Sage'
                }
            },
            en: {
                src: ['../Sage/SalesLogix/Client/WebCommon/jscript/Sage/**/nls/*.js']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-nls-copy');
    grunt.registerTask('default', ['nlscopy']);
};
```
