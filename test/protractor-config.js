// node packagees
// var jasmineReporters = require("jasmine-reporters");
// var Jasmine2HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
var fs = require("fs");

//-------------------------
// create reporters
//-------------------------

// var junit_xml_reporter = new jasmineReporters.JUnitXmlReporter({
//     consolidateAll: true,
//     savePath: project_config.path.dir.protractor,
//     filePrefix: 'junit_report'
// });
//
// var html_reporter = new Jasmine2HtmlScreenshotReporter({
//     dest: project_config.path.dir.protractor,
//     showQuickLinks: false,
//     reportOnlyFailedSpecs: false,
//     captureOnlyFailedSpecs: true,
//     showSummary: true,
//     filename: "index.html",
//     reportTitle: "Protractor Tests",
//     userCss: ["../protractor-html-report.css", "./protractor-html-report.css"],
//     pathBuilder: function( currentSpec, suites, browserCapabilities ) {
//         // will return chrome/your-spec-name.png
//         return browserCapabilities.get( "browserName" ) + "/" + currentSpec.fullName;
//     }
// });

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

        // create functions for the e2e files to easily get page objects and helpers
        // global.requirePageObject = function( path ) {
        //     var dir = __dirname.split("/");
        //     dir.pop(); // remove last directory
        //
        //     return require( dir.join("/") + "/src/tests/" + path + "/page-object.js");
        // };
        //
        // global.requireHelper = function( path ) {
        //     return require( __dirname + "/helpers/" + path );
        // };

        // set the position and size of the browser
        browser.driver.manage().window().setSize( 1600, 800 );
        browser.driver.manage().window().setPosition( 50, 100 );
    },
    // Setup the report before any tests start
    // beforeLaunch: function() {
    //     return new Promise(function(resolve) {
    //         html_reporter.beforeLaunch(resolve);
    //     });
    // },
    // // Close the report after all tests finish
    // afterLaunch: function(exitCode) {
    //     return new Promise(function(resolve) {
    //         html_reporter.afterLaunch(resolve.bind(this, exitCode));
    //     });
    // }
};

module.exports.config = _config;
