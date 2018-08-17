
var Thug = require("thug")
var timeline = []

var addTimestamp = function(obj, next){
  if(!obj.ts) obj.ts = new Date().toJSON()
  return next(obj)
}

var makeObj = function(str, next){
  return next({ str: str })
}

var makeString = function(record, next){
  return next([record.id, record.str].join(" "))
}

var store = new Thug({
  "filters": {
    "in": [makeObj],
    "beforeValidate": [addTimestamp],
    "out": [makeString]
  },
  "methods": {
    all: function(id, callback){
      if (!callback) callback = id
      return callback(timeline)
    }
  }
})

store.constructor.prototype.write = function(identifier, record, callback){
  timeline.unshift([record.ts, record.str].join(" "))
  callback(record)
}

store.constructor.prototype.read = function(identifier, callback){
  timeline.every(function(str){
    if (str.substr(0,str.indexOf(' ') == identifier)){
      return str.substr(str.indexOf(' ') +1)
    }
  })
}

module.exports = store
