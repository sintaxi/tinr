
# TINR

> TINR is not RSS

TINR is a protocol over https for abitrary 432 character


### server

var tinr       = require("tinr")
var middleware = tinr.apiMiddlware("sintaxi.com:deepS3cret")

express().use(middleware).listen(4343)

