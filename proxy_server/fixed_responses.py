# (this script works best with --anticache)
from bs4 import BeautifulSoup
from mitmproxy import ctx, http
import json
import re

class Injector:
    def response(self, flow: http.HTTPFlow) -> None:
        # Topshop PDP
        if 'http://local.m.topshop.com:8080/api/products/%2Fen%' in flow.request.url:
            flow.response = http.HTTPResponse.make(
                200,
                json.dumps(json.load(open('proxy_server/fixed_responses/ts_pdp.json'))),
                {"Content-Type": "application/json"}
            )
        # Dorothy Perkins PDP - Products out of stock
        if 'http://local.m.dorothyperkins.com:8080/api/products/%2Fen%' in flow.request.url:
            flow.response = http.HTTPResponse.make(
                200,
                json.dumps(json.load(open('proxy_server/fixed_responses/dp_pdp.json'))),
                {"Content-Type": "application/json"}
            )
        # Dorothy Perkins Quick View
        if re.match(r'http://local.m.dorothyperkins.com:8080/api/products/[0-9]{8}', flow.request.url):
        # if flow.request.url == 'http://local.m.dorothyperkins.com:8080/api/products/31364808':
            flow.response = http.HTTPResponse.make(
                200,
                json.dumps(json.load(open('proxy_server/fixed_responses/quickview.json'))),
                {"Content-Type": "application/json"}
            )

addons = [Injector()]

# Run this script with:
# mitmweb --listen-host 0.0.0.0 --listen-port 3044 -s proxy_server/fixed_responses.py --anticache
# mitmweb --listen-host 0.0.0.0 --listen-port 3044 -s proxy_server/fixed_responses.py --anticache --ignore '^(?!topshop\.com)'
# mitmweb --listen-host 0.0.0.0 --listen-port 3044 -s proxy_server/fixed_responses.py --anticache --intercept '~a'
# mitmweb --listen-host 0.0.0.0 --listen-port 3044 -s proxy_server/fixed_responses.py --anticache --set stream_large_bodies=30k

# Start Chrome with proxy via
# /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --proxy-server=http://0.0.0.0:3044
