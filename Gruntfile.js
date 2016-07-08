(function(module) {

    'use strict';

    module.exports = function (grunt) {
        // if this variable exists we have already set up grunt
        if (!grunt || !grunt.config || !grunt.config.data || !grunt.config.data.config || !grunt.config.data.config.dev) {
            // Load grunt modules from package.json automatically
            require('load-grunt-tasks')(grunt);

            // config variables, these are accessible like '<%= config.dev %>'
            var gruntConfig = {config: {
                // folders
                src: 'src',
                dist: 'dist',
                tests: 'tests',
                grunt: 'grunt',
                scripts: 'scripts',
                styles: 'styles',
                // misc
                filename: 'angularjs-color-picker',
                pkg: grunt.file.readJSON('package.json'),
            }};

            // loads tasks in the 'grunt' folder
            grunt.loadTasks('grunt');
            // loads task options in the 'grunt/options' folder
            grunt.initConfig(grunt.util._.extend(gruntConfig, gruntLoadConfig('./grunt/options/', grunt)));
        }
    };

    function gruntLoadConfig(path, grunt) {
        var glob = require('glob');
        var object = {};
        var key;

        glob.sync('*', {cwd: path}).forEach(function(option) {
            key = option.replace(/\.js$/,'');
            object[key] = require(process.cwd() + path.replace('.', '') + option);
            if (typeof object[key] == 'function') {
                object[key] = object[key](grunt);
            }
        });

        return object;
    }
})(module);
