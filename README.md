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
