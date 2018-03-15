module.exports = function(casper, scenario, vp) {
    // Sleep before clicking to ensure the JavaScript is loaded
    casper.echo("openBurgerMenu.js")
    casper.wait(20000)
    casper.click(".BurgerButton")
    casper.wait(5000)
}
