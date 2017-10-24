var fs = require("fs");
var util = require("gulp-util");
var path = require("path");
var through = require("through2");
var crypto = require("crypto");
var PluginError = util.PluginError;
var options = {};
var cacheArray = [];
var version = "0.0.1"; /* must match package.json file */

function gulpSriPhp(opts) {
  options = opts;
  if(!options || options.toString()!=="[object Object]") {
    options = {};
  }
  cacheArray = []; //reset cache
  var stream = through.obj(function(file,enc,cb) {
    if(file.isNull()) {
      this.push(file);
      return cb();
    }
    if(!file.isBuffer()) {
      this.emit("error",new PluginError("gulp-sri-php","Sorry, streams are not supported in gulp-sri-php"));
    }
    if(options.verbose) {
      console.log("[gulp-sri-php@"+version+"] processing "+file.relative+"...");
    }
    var cont = processStylesheets(file.contents.toString());
    file.contents = new Buffer(cont);
    this.push(file);
    return cb();
  });
  return stream;
}

function processStylesheets(orig) {
  var regex = /<link.*rel=('|"){0,1}stylesheet('|"){0,1}.*>/gmi;
  var cont = orig;
  var res = null;
  while((res = regex.exec(orig))) {
    var text = res[0];
    var name = extractFilename(text,"href"); //can I do this in the RegEx?
    var path = calculatePath(name);
    var hash = calculateHash(path);
    //todo
  }
  return cont;
}

function processScripts(orig) {
  var regex = /<script.*src=['"]{0,1}([^'" ]*).*>.*<\/script>/gmi;
  var cont = orig;
  var res = null;
  while((res = regex.exec(orig))) {
    var text = res[0];
    var name = res[1]; //no need for extractFilename here
    var path = calculatePath(name);
    var hash = calculateHash(path);
    //todo
  }
  return cont;
}

function extractFilename(text,attr) {
  //todo
}

function calculatePath(name) {
  //todo
}

function calculateHash(path) {
  var file = fs.readFileSync(path);
  return crypto.createHash(options.algorithm).update(file).digest("base64");
}

module.exports = gulpSriPhp;
