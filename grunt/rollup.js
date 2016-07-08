var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var es2015Rollup = require('babel-preset-es2015-rollup');
var uglify = require('rollup-plugin-uglify');
var moment = require('moment');
var pjson = require('../package.json');

var today = moment();

var writeOptions = {
    dest: 'dist/angularjs-color-picker.js',
    format: 'umd',
    moduleName: 'AngularjsColorPicker',
    sourceMap: false,
    banner: '/*!\n * ' + pjson.name + ' v' + pjson.version + '\n * https://github.com/ruhley/angular-color-picker/\n *\n * Copyright ' + today.format('YYYY') + ' ruhley\n *\n * ' + today.format('YYYY-MM-DD HH:mm:ss') + '\n *\n */\n'
};

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
        response.write(writeOptions).then(function() {
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
        uglify({
            output: {
                comments: function(node, comment) {
                    var text = comment.value;
                    var type = comment.type;
                    if (type == 'comment2') {
                        // multiline comment
                        return /!/i.test(text);
                    }
                }
            }
        }),
    ]
}).then(function(response) {
    try {
        writeOptions.dest = writeOptions.dest.replace('.js', '.min.js');
        response.write(writeOptions).then(function() {
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
