#!/usr/bin/env node

var defaultAdapter = require("./adapter.js")

exports.apiMiddlware = function(creds, adapter){

  var domain   = creds.split(":")[0]
  var password = creds.split(":")[1]
  adapter = adapter || defaultAdapter

  return function(req, rsp, next){
    console.log(req.headers)
    var isTinrDomain = function(){
      return (req.hostname === domain)
    }

    var isTinrRequest = function(){
      return (req.headers.hasOwnProperty("user-agent") && req.headers["user-agent"].indexOf("curl") == 0)
    }
    
    if (isTinrDomain() && isTinrRequest()) {
      console.log("TINR:", req.hostname, req.method, req.headers)

      if (req.url === "/"){
        if (req.method == "POST"){
          
          var body = ''
          req.on('data', function (data) { 
            body += data
          })

          req.on('end', function () {
            adapter.set(body, function(errors, post){
              rsp.status(201).send(post.ts)
            })
          })
          
        } else {
          adapter.all(function(records){
            if (records.length > 0){
              rsp.send(records.join("\n") + "\n")
            }else{
              rsp.status(204).send("")
            }
          })
        }
      }
      
    }

    return next()
  }

}
