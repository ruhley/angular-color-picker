module.exports = function(grunt) {
    grunt.registerTask('build', [
        'notify:build',
        'jshint:lib',
        // 'jshint:tests',
        'jshint:grunt',
        //'karma:build',
        'clean:build',
        'concat:build',
        'less:build',
        'uglify:build',
        'cssmin:build',
        'notify:buildComplete'
    ]);
};
