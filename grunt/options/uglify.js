module.exports = {
    build: {
        options: {
            sourceMap: true,
            sourceMapName: '<%= config.filename %>.min.map',
            preserveComments: 'some',
            screwIE8: true
        },
        files: {
            '<%= config.filename %>.min.js': '<%= config.filename %>.js'
        }
    }
};
