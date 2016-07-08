module.exports = function() {
    return {
        options: {
            ieCompat: false,
            strictMath: true,
            sourceMap: false,
            banner: '/*!\n * <%= config.pkg.name %> v<%= config.pkg.version %>\n * https://github.com/ruhley/angular-color-picker/\n *\n * Copyright <%= grunt.template.today("yyyy") %> ruhley\n *\n * <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n *\n */\n'
        },
        build: {
            files: [{
                expand: true,
                cwd: '<%= config.src %>/<%= config.styles %>',
                src: ['**/*.less'],
                dest: '<%= config.dist %>',
                ext: '.css'
            }]
        }
    };
};
