module.exports = {
    options: {
        keepSpecialComments: 1
    },
    build: {
        files: [{
            src: ['<%= config.filename %>.css'],
            dest: '<%= config.filename %>.min.css',
        }]
    }
};
