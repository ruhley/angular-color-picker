var rollup = require('rollup');

var rollup_options = require('./options/rollup');



rollup.rollup(rollup_options.options).then(function(writer) {
    rollup_options.writeFile(writer, rollup_options.writeOptions);
}, rollup_options.reject);

rollup.rollup(rollup_options.options_min).then(function(writer) {
    rollup_options.writeOptions.dest = rollup_options.writeOptions.dest.replace('.js', '.min.js');
    rollup_options.writeFile(writer, rollup_options.writeOptions);
}, rollup_options.reject);
