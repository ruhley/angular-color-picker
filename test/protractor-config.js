var fs = require("fs");

//-------------------------
// get selenium executables
//-------------------------

var selenium_dir = "./node_modules/protractor/node_modules/webdriver-manager/selenium/";
var files = fs.readdirSync(selenium_dir);
var selenium_server_jar = null;
var chrome_driver = null;

for (var i = 0; i < files.length; i++) {
    if (/^selenium-server-standalone-[\d\.]+\.jar$/i.test(files[i])) {
        selenium_server_jar = files[i];
    } else if (/^chromedriver_[\d\.]+$/i.test(files[i])) {
        chrome_driver = files[i];
    }
}

//-------------------------
// protractor config
//-------------------------

var _config = {
    seleniumServerJar: "." + selenium_dir + selenium_server_jar,
    chromeDriver: "." + selenium_dir + chrome_driver,
    specs: ["**/*.protractor.js"],

    // options to be passed to jasmine
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 80000,
        isVerbose: true,
        includeStackTrace: true
    },
    onPrepare: function() {
        // allow new javascript features to work
        require( "babel-core/register" )( { presets: [ "es2015" ] } );

        // set the position and size of the browser
        browser.driver.manage().window().setSize( 1600, 800 );
        browser.driver.manage().window().setPosition( 50, 100 );
    },
};

module.exports.config = _config;
