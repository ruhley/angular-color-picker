var rollup = require('rollup');

var rollup_options = require('./options/rollup');



rollup.rollup(rollup_options.options).then(function(writer) {
    rollup_options.writeFile(writer, rollup_options.writeOptions);

    rollup.rollup(rollup_options.options_min).then(function(writer) {
        rollup_options.writeOptions.file = rollup_options.writeOptions.file.replace('.js', '.min.js');
        rollup_options.writeFile(writer, rollup_options.writeOptions);
    }, rollup_options.reject);
}, rollup_options.reject);
