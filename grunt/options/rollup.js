var babel = require('rollup-plugin-babel');
var es2015Rollup = require('babel-preset-es2015-rollup');
var moment = require('moment');

var pjson = require('../../package.json');

var today = moment();

module.exports = {
    options: {
        entry: 'src/scripts/module.js',
        plugins: [
            babel({
                exclude: 'node_modules/**',
                presets: [ es2015Rollup ]
            })
        ]
    },
    writeOptions: {
        dest: 'dist/angularjs-color-picker.js',
        format: 'umd',
        moduleName: 'AngularjsColorPicker',
        sourceMap: false,
        banner: '/*!\n * ' + pjson.name + ' v' + pjson.version + '\n * https://github.com/ruhley/angular-color-picker/\n *\n * Copyright ' + today.format('YYYY') + ' ruhley\n *\n * ' + today.format('YYYY-MM-DD HH:mm:ss') + '\n *\n */\n'
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
    },
};
