module.exports = {
    options: {
        keepSpecialComments: 1
    },
    build: {
        files: [{
            src: ['<%= config.dist %>/<%= config.filename %>.css'],
            dest: '<%= config.dist %>/<%= config.filename %>.min.css',
        }]
    }
};
