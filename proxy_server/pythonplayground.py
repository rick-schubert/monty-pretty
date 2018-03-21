import re
teststring = 'http://local.m.dorothyperkins.com:8080/api/products/31364808'
print(re.match(r'http://local.m.dorothyperkins.com:8080/api/products/[0-9]{8}', teststring))
