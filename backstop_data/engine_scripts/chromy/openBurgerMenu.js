const chalk = require("chalk")

module.exports = function(chromy, scenario, vp) {
    console.log(
        chalk.yellowBright("openBurgerMenu.js | Scenario: " + scenario.label)
    )
    // Sleep before clicking to ensure the JavaScript is loaded
    chromy
        .sleep(5000)
        .click(".BurgerButton")
        .sleep(5000)
}
