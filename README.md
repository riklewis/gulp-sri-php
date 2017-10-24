Description
===========

Scan PHP files in Gulp and process script and stylesheet tags to add SRI attributes.

I tried other plugins, but found the following issues...
* gulp-sri-hash - uses Cheerio, which expects HTML and fails on PHP tags
* gulp-srizer - requires OpenSSL and only works on Linux
* gulp-sri - creates a JSON file but doesn't update the files inline

For these reasons, I decided to write my own.

Status
======

[![NPM Version](http://img.shields.io/npm/v/gulp-sri-php.svg?style=flat)](https://www.npmjs.org/package/gulp-sri-php) [![Stability](https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat)](https://github.com/riklewis/gulp-sri-php) [![Dependencies](http://img.shields.io/david/riklewis/gulp-sri-php.svg?style=flat)](https://david-dm.org/riklewis/gulp-sri-php) [![Development Dependencies](http://img.shields.io/david/dev/riklewis/gulp-sri-php.svg?style=flat)](https://david-dm.org/riklewis/gulp-sri-php?type=dev) [![Build Status](http://img.shields.io/travis/riklewis/gulp-sri-php.svg?style=flat)](https://travis-ci.org/riklewis/gulp-sri-php)
[![Coverage Status](http://img.shields.io/coveralls/riklewis/gulp-sri-php.svg?style=flat)](https://coveralls.io/r/riklewis/gulp-sri-php?branch=master) [![Gratipay](https://img.shields.io/gratipay/project/gulp-sri-php.svg)](https://gratipay.com/gulp-sri-php/)

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
      sri({verbose:true}),
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

* **verbose**: Will output additional messages to the console (boolean - default: false)
