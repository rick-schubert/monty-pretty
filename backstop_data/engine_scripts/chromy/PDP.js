const chalk = require("chalk")

module.exports = function(chromy, scenario, vp) {
    console.log(chalk.yellowBright("PDP.js | Scenario: " + scenario.label))
    chromy.evaluate(() => {
        document.querySelector(".Carousel-image").src =
            "https://images.pexels.com/photos/226597/pexels-photo-226597.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
        document.querySelector(".ProductDetail-title").innerText =
            "Magnificient pink shoes with luxurious flower applications affixed to the heel in a lovely fashion"
        document.querySelector(".Price").innerText = "£12.34"
    })
}
