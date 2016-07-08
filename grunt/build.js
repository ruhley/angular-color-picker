module.exports = function(grunt) {
    grunt.registerTask('build', [
        'notify:build',
        'jshint:src',
        'jshint:grunt',
        'clean:build',
        'run:rollup',
        'less:build',
        'cssmin:build',
        'notify:buildComplete'
    ]);
};
