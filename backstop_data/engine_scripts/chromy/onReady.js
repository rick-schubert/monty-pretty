const chalk = require("chalk")

module.exports = function (chromy, scenario, vp) {
    console.log(chalk.yellowBright("Chromy onReady. Scenario " + scenario.label))
    chromy.evaluate(() => {
        document.cookie="featuresOverride={\"FEATURE_RESPONSIVE\":true,\"FEATURE_LEGACY_PAGES\":true, \"FEATURE_HEADER_BIG\": true}"
        location.reload()
    })
    chromy.sleep(20000)
    console.log(chalk.magentaBright("Reloading the page and waiting."))
}
