# (this script works best with --anticache)
from bs4 import BeautifulSoup
from mitmproxy import ctx, http
import json
import re

class Injector:
    def load(self, loader):
        loader.add_option(
            "iframe", str, "", "IFrame to inject"
        )

    def response(self, flow: http.HTTPFlow) -> None:
        if flow.request.url == 'http://www.example.com/':
            flow.response.content = str("You requested example.com").encode("utf8")
        if 'http://local.m.topshop.com:8080/api/products/%2Fen%' in flow.request.url:
            flow.response = http.HTTPResponse.make(
                200,
                json.dumps(json.load(open('proxy_server/fixed_responses/pdp.json'))),
                {"Content-Type": "application/json"}
            )
        if re.match(r'http://local.m.dorothyperkins.com:8080/api/products/[0-9]{8}', flow.request.url):
        # if flow.request.url == 'http://local.m.dorothyperkins.com:8080/api/products/31364808':
            flow.response = http.HTTPResponse.make(
                200,
                json.dumps(json.load(open('proxy_server/fixed_responses/quickview.json'))),
                {"Content-Type": "application/json"}
            )

addons = [Injector()]

# Run this script with:
# mitmproxy --listen-host 0.0.0.0 --listen-port 3044 -s proxy_server/index.py --anticache
# mitmproxy --listen-host 0.0.0.0 --listen-port 3044 -s proxy_server/index.py --anticache --ignore '^(?!topshop\.com)'
# mitmproxy --listen-host 0.0.0.0 --listen-port 3044 -s proxy_server/index.py --anticache --intercept '~a'

# Start Chrome with proxy via
# /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --proxy-server=http://0.0.0.0:3044
