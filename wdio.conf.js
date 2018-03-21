const path = require("path")

exports.config = {
    specs: ["./tests/**.js"],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [
        {
            browserName: "chrome",
            chromeOptions: {
                args: ["--proxy-server=http://0.0.0.0:3044"],
            },
        },
    ],
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: "silent",
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Warns when a deprecated command is used
    deprecationWarnings: true,
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: path.join(__dirname, "./screenshots/"),
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: "http://localhost",
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 40000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    framework: "mocha",
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/reporters/dot.html
    reporters: ["spec", "mochawesome"],
    reporterOptions: {
        outputDir: "./reports", //json file will be written to this directory
        mochawesome_filename: "./mochawesome.json", //will default to wdiomochawesome.json if no name is provided
    },
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: "bdd",
        timeout: "120000",
    },
    services: ["selenium-standalone"],
    seleniumInstallArgs: { drivers: { chrome: { version: "2.35" } } },
    seleniumArgs: { drivers: { chrome: { version: "2.35" } } },
    plugins: {
        "wdio-screenshot": {},
    },
}
