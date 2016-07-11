var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var es2015Rollup = require('babel-preset-es2015-rollup');
var uglify = require('rollup-plugin-uglify');

rollup.rollup({
    entry: 'src/scripts/module.js',
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [ es2015Rollup ]
        }),
    ]
}).then(function(response) {
    try {
        response.write({
            dest: 'dist/angularjs-color-picker.js',
            format: 'umd',
            moduleName: 'AngularjsColorPicker',
            sourceMap: false,
        }).then(function() {
            console.log('File created');
        }, function() {
            console.log(arguments);
        });
    } catch (e) {
        console.log(e);
    }
}, function(response) {
    console.log(response);
});


rollup.rollup({
    entry: 'src/scripts/module.js',
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [ es2015Rollup ]
        }),
        uglify(),
    ]
}).then(function(response) {
    try {
        response.write({
            dest: 'dist/angularjs-color-picker.min.js',
            format: 'umd',
            moduleName: 'AngularjsColorPicker',
            sourceMap: false,
        }).then(function() {
            console.log('File created');
        }, function() {
            console.log(arguments);
        });
    } catch (e) {
        console.log(e);
    }
}, function(response) {
    console.log(response);
});
