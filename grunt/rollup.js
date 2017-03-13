var rollup = require('rollup');
var uglify = require('rollup-plugin-uglify');

var options = require('./options/rollup');



rollup.rollup(options.options).then(function(writer) {
    options.writeFile(writer, options.writeOptions);
}, options.reject);

options.options.plugins.push(uglify({
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
}));

rollup.rollup(options.options).then(function(writer) {
    options.writeOptions.dest = options.writeOptions.dest.replace('.js', '.min.js');
    options.writeFile(writer, options.writeOptions);
}, options.reject);
