module.exports = function(grunt) {
    grunt.registerTask('test', [
        'jshint:tests',
        'karma:test'
    ]);
};
