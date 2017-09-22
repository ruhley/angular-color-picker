var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');
var es2015Rollup = require('babel-preset-es2015-rollup');
var moment = require('moment');

var pjson = require('../../package.json');

var today = moment();

module.exports = {
    options: {
        input: 'src/scripts/module.js',
        plugins: [
            babel({
                exclude: 'node_modules/**',
                presets: [ es2015Rollup ]
            })
        ]
    },
    options_min: {
        input: 'src/scripts/module.js',
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
                        if (type === 'comment2') {
                            // multiline comment
                            return /!/i.test(text);
                        }
                    }
                }
            })
        ]
    },
    writeOptions: {
        file: 'dist/angularjs-color-picker.js',
        format: 'umd',
        name: 'AngularjsColorPicker',
        sourcemap: false,
        banner: '/*!\n * ' + pjson.name + ' v' + pjson.version + '\n * https://github.com/ruhley/angular-color-picker/\n *\n * Copyright ' + today.format('YYYY') + ' ruhley\n *\n * ' + today.format('YYYY-MM-DD HH:mm:ss') + '\n *\n */\n',
        globals: {
            tinycolor2: 'tinycolor',
        },
    },
    writeFile: function(writer, writeOptions) {
        try {
            writer.write(writeOptions).then(function() {
                console.log('File created');
            }, function() {
                console.log(arguments);
            });
        } catch (e) {
            console.log(e);
        }
    },
    reject: function(response) {
        console.log(response);
    }
};
