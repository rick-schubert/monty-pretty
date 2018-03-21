const path = require("path")
const assert = require("assert")

const pdp = require("./../proxy_server/fixed_responses/pdp.json")

describe("Mobile screenshots", () => {
    it("PDP", () => {
        browser.setViewportSize({
            width: 500,
            height: 1080,
        })

        browser.url(
            "http://local.m.topshop.com:8080/en/tsuk/product/clothing-427/dresses-442/polka-dot-lace-satin-slip-dress-7483023"
        )
        browser.waitForVisible(".ProductDetail-title")
        // turns every first letter to upper case
        assert.equal(
            browser.getText(".ProductDetail-title"),
            pdp.name.replace(/\w\S*/g, (txt) => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            })
        )
        browser.saveViewportScreenshot(
            path.join(__dirname, `./../screenshots/${Date.now()}.jpg`)
        )
    })
})
