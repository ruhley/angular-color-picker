module.exports = {
    build: {
        options: {
            sourceMap: true,
            sourceMapName: '<%= config.dist %>/<%= config.filename %>.min.map',
            preserveComments: 'some',
            screwIE8: true
        },
        files: {
            '<%= config.dist %>/<%= config.filename %>.min.js': '<%= config.dist %>/<%= config.filename %>.js'
        }
    }
};
