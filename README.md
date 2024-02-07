
# TINR

> TINR is not RSS

TINR is a protocol over https for built upon the `.trickle` file format.


### how to implement me

curl -d "hello world" sintaxi.com

### how to host your own tinr feed.

var tinr       = require("tinr")
var middleware = tinr.apiMiddlware("sintaxi.com:deepS3cret")

express().use(middleware).listen(4343)



