Description
===========

Scan PHP (or other HTML-based) files in Gulp and process script and stylesheet tags to add Sub-Resource Integrity (SRI) attributes.

I tried other plugins, but found the following issues...
* [gulp-sri-hash](https://www.npmjs.com/package/gulp-sri-hash) - uses Cheerio, which expects HTML and fails on PHP tags
* [gulp-srizer](https://www.npmjs.com/package/gulp-srizer) - requires OpenSSL and doesn't work on Windows (uses 'cat')
* [gulp-sri](https://www.npmjs.com/package/gulp-sri) - creates a JSON file with hashes but doesn't update the files inline

For these reasons, I decided to write my own.  

This plugin doesn't worry about non-HTML tags (such as PHP), it uses the built in [crypto](https://nodejs.org/api/crypto.html) module, and it updates the HTML tags that it finds as it goes. It also allows for multiple algorithms to be specified, which is pretty cool.

Tags will be ignored for the following reasons...
* It already has an "integrity" attribute
* It has an absolute reference (eg. starting http(s)://)
* It's so mangled that the file path cannot be determined

Just to clarify, this plugin isn't specifically for PHP files, but will work with HTML tags in any file, such as a PHP file, without worrying about the non-HTML parts.

Status
======

[![NPM Version](http://img.shields.io/npm/v/gulp-sri-php.svg?style=flat)](https://www.npmjs.org/package/gulp-sri-php) [![Stability](https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat)](https://github.com/riklewis/gulp-sri-php) [![Dependencies](http://img.shields.io/david/riklewis/gulp-sri-php.svg?style=flat)](https://david-dm.org/riklewis/gulp-sri-php) [![Development Dependencies](http://img.shields.io/david/dev/riklewis/gulp-sri-php.svg?style=flat)](https://david-dm.org/riklewis/gulp-sri-php?type=dev) [![Build Status](http://img.shields.io/travis/riklewis/gulp-sri-php.svg?style=flat)](https://travis-ci.org/riklewis/gulp-sri-php)
[![Coverage Status](http://img.shields.io/coveralls/riklewis/gulp-sri-php.svg?style=flat)](https://coveralls.io/r/riklewis/gulp-sri-php?branch=master)

Requirements
============

* [Gulp](https://gulpjs.com) - v3.9.1 or newer


Install
=======

    npm install gulp-sri-php --save-dev


Examples
========

* gulpfile.js
```javascript
  var gulp = require("gulp");
  var pump = require("pump");
  var sri = require("gulp-sri-php");
  var phpFiles = ["index.php"];

  gulp.task("php",function(cb) {
    pump([
      gulp.src(phpFiles),
      sri({verbose:true,algorithm:"sha384"}),
      gulp.dest("build")
    ],cb);
  });
```

* index.php (before)
```html
  <!DOCTYPE html>
  <html lang="en-gb">
    <head>
      <title>gulp-sri-php</title>
      <link rel="stylesheet" href="css/style.css">
      <script src="js/script.js" defer></script>
    </head>
    <body>
      <!-- etc -->
    </body>
  </html>
```

* index.php (after)
```html
  <!DOCTYPE html>
  <html lang="en-gb">
    <head>
      <title>gulp-sri-php</title>
      <link rel="stylesheet" href="css/style.css" integrity="sha384-54Zl+ll6X3PdHPKfBjEU8TtSZc29x/y3anYm06KOlBpMAZcRS9Zw4YwloXptTN0n" crossorigin="anonymous">
      <script src="js/script.js" defer integrity="sha384-1hPB2dkVqfc4TsrWjuj7Ot6EjZpPCT8SXkMPcFVS72GywaLYlgGGC21Bden2FYc0" crossorigin="anonymous"></script>
    </head>
    <body>
      <!-- etc -->
    </body>
  </html>
```


Configuration options
==========

* **algorithm**: The hashing algorithm(s) you want to use (string or array - default: ["sha256","sha384","sha512"])
* **verbose**: Will output additional messages to the console (boolean - default: false)


Treat me to a beer!
===================

[![PayPal](https://img.shields.io/badge/PayPal-Donate-blue.svg)](https://www.paypal.me/riklewis)
