module.exports = {
    options: {
        globals: {
            // js globals
            angular: true,
            _: true,
            console: true,
            // grunt globals
            module: true,
            require: true,
            process: true,
        }
    },
    lib: ['<%= config.lib %>/**/*.js'],
    tests: ['karma.conf.js', '<%= config.tests %>/**/*.js'],
    grunt: ['Gruntfile.js', '<%= config.grunt %>/**/*.js']
};
