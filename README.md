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

Example of package.json: 
```
{
  "name": "saleslogix",
  "version": "8.1.0",
  "devDependencies": {
    "grunt": "~0.4.0",
    "grunt-contrib-nls-copy": "https://github.com/Saleslogix/grunt-contrib-nls-copy/tarball/master"
  }
}
```

Changes:

0.1.3
 * Added new option "skipCheckin" that will skip checking in the tfs items, allowing the developer to review the files after the task runs
 * Fixed dojo src path issue, and added debug logging for the dojo path
 
0.1.2
 * Allow dojo path to be absolute

0.1.1
 * Fixed dependencies

0.1.0
 * Initial checkin
