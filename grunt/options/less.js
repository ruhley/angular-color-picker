module.exports = function() {
    return {
        options: {
            ieCompat: false,
            strictMath: true,
            sourceMap: false,
            banner: '/*!\n * <%= config.pkg.name %> v<%= config.pkg.version %>\n * https://github.com/ruhley/angular-color-picker/\n *\n * Copyright 2015 ruhley\n *\n * <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n *\n */\n'
        },
        build: {
            files: [{
                expand: false,
                src: '<%= config.lib %>/<%= config.styles %>/**/*.less',
                dest: '<%= config.filename %>.css'
            }]
        }
    };
};
