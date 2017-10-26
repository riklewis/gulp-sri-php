var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
var util = require("gulp-util");
var through = require("through2");
var unquote = require("unquote");
var isarray = require("is-arrayish");
var PluginError = util.PluginError;
var options = {};
var cacheArray = [];
var algorithms = ["sha256","sha384","sha512"];
var version = "1.1.3"; /* must match package.json file */

function gulpSriPhp(opts) {
  options = opts;
  if(!options || options.toString()!=="[object Object]") {
    options = {};
  }
  if(options.algorithm) {
    if(typeof(options.algorithm)==="string") {
      options.algorithm = [options.algorithm];
    }
    if(isarray(options.algorithm) && options.algorithm.length) {
      var len = options.algorithm.length;
      for(var i=0;i<len;i++) {
        if(algorithms.indexOf(options.algorithm[i])<0) {
          throw new PluginError("gulp-sri-php","Sorry, algorithm '"+options.algorithm[i]+"' is not supported. Options are: "+algorithms.join("/"));
        }
      }
    }
    else {
      throw new PluginError("gulp-sri-php","Sorry, algorithm '"+options.algorithm+"' is not supported. Options are: "+algorithms.join("/"));
    }
  }
  options.algorithm = options.algorithm || ["sha256","sha384","sha512"];
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
    options.base = file.base || file.basename;
    var cont = processScripts(processStylesheets(file.contents.toString()));
    file.contents = new Buffer(cont);
    this.push(file);
    return cb();
  });
  return stream;
}

function processStylesheets(orig) {
  var regex = /<link.*rel=['"]{0,1}stylesheet['"]{0,1}[^>]*>/gmi;
  var cont = orig;
  var res = null;
  while((res = regex.exec(orig))) {
    var text = res[0];
    var attr = extractAttributes(text);
    if(attr.href) {
      if(!attr.integrity) {
        var path = calculatePath(attr.href);
        if(path) {
          var hash = calculateHash(path);
          if(hash) {
            attr.integrity = hash;
            cont = rewriteTag(cont,text,attr);
            if(options.verbose) {
              console.log("[gulp-sri-php@"+version+"] hashed: "+attr.href+" ("+hash+")");
            }
          }
        }
      }
    }
  }
  return cont;
}

function processScripts(orig) {
  var regex = /<script.*src=['"]{0,1}([^'"> ]*)[^>]*>/gmi;
  var cont = orig;
  var res = null;
  while((res = regex.exec(orig))) {
    var text = res[0];
    var attr = extractAttributes(text);
    if(attr.src) {
      if(!attr.integrity) {
        var path = calculatePath(attr.src);
        if(path) {
          var hash = calculateHash(path);
          if(hash) {
            attr.integrity = hash;
            cont = rewriteTag(cont,text,attr);
            if(options.verbose) {
              console.log("[gulp-sri-php@"+version+"] hashed: "+attr.src+" ("+hash+")");
            }
          }
        }
      }
    }
  }
  return cont;
}

function rewriteTag(cont,text,attr) {
  var add = " integrity=\""+attr.integrity+"\"";
  if(!attr.crossorigin) {
    add += " crossorigin=\"anonymous\"";
  }
  var tag = text.replace(/\s{0,}\/{0,1}>/,add+">");
  return cont.replace(text,tag);
}
function extractAttributes(text) {
  var att = [];
  var arr = text.substr(1,text.length-2).split(" ");
  var len = arr.length;
  for(var i=1;i<len;i++) {
    var itm = arr[i];
    var pos = itm.indexOf("=");
    if(pos>-1) {
      var nam = itm.substr(0,pos).toLowerCase();
      var val = unquote(itm.substr(pos+1));
      att[nam] = val;
    }
    else {
      itm = itm.toLowerCase();
      att[itm] = itm;
    }
  }
  return att;
}

function calculatePath(fnam) {
  if(fnam.substr(0,8)==="https://" || fnam.substr(0,7)==="http://" || fnam.substr(0,2)==="//") {
    return ""; //ignore external links
  }
  if(fnam.indexOf("?")>-1) {
    fnam = fnam.substr(0,fnam.indexOf("?")); //remove query string (most likely a cache busting hash)
  }
  return path.normalize(path.join(options.base,fnam));
}

function calculateHash(path) {
  if(!cacheArray[path]) {
    var hash = "";
    try {
      var file = fs.readFileSync(path);
      var len = options.algorithm.length;
      for(var i=0;i<len;i++) {
        hash += " "+options.algorithm[i]+"-"+crypto.createHash(options.algorithm[i]).update(file).digest("base64");
      }
      hash = hash.substr(1);
    }
    catch(e) {
      hash = "";
      if(options.verbose) {
        console.log("[gulp-sri-php@"+version+"] failed: "+path);
      }
    }
    cacheArray[path] = hash;
  }
  return cacheArray[path];
}

module.exports = gulpSriPhp;
