var fs = require("fs");
var util = require("gulp-util");
var path = require("path");
var es = require("event-stream");
var expect = require("chai").expect;
var sinon = require("sinon");
var srihash = require("../");

describe("gulp-sri-php",function() {
  it("should be awesome",function() {
    expect(1).to.equal(1); //always true
  });
  describe("isNull()",function() {
    it("should do nothing",function(done) {
      var temp = new util.File(null);
      var stream = srihash();
      stream.write(temp);
      stream.once("data",function(file) {
        expect(file.isNull()).to.be.true;
        expect(file.contents).to.be.null;
        done();
      });
    });
  });
  describe("isSteam()",function() {
    it("should throw an error - not supported",function(done) {
      var temp = new util.File({contents:es.readArray(["stream","with","those","contents"])});
      var stream = srihash();
      expect(function() {
        stream.write(temp);
      }).to.throw("not supported");
      done();
    });
  });
  describe("isBuffer()",function() {
    describe("File: Javascript (.js)",function() {
      it("should add integrity attribute for a javascript file (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=");
          done();
        });
      });
      it("should add crossorigin attribute for a javascript file (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("crossorigin=");
          done();
        });
      });
      it("should calculate 'sha256' hash for a javascript file (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("sha256-DOkd/W7jLx2swQyb31v+kZ2Y9z7romuHeV9D9POBywA=");
          done();
        });
      });
      it("should calculate 'sha384' hash for a javascript file (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("sha384-i2Zy8xcheu730XpEpNxLWtYctJ60DqnEaYmdxnueIa6on15NN/RKOMd++HVGTdKb");
          done();
        });
      });
      it("should calculate 'sha512' hash for a javascript file (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("sha512-NH0m4Mws0R+H1MXESjogwfykAeH/bMaoVomwHbBH1AeLesxVIohIXA0HzqjW/5m0RIUnVpNZmiGL+jFkJu8doQ==");
          done();
        });
      });
      it("should add integrity attribute for a javascript file (single quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src='test/fixtures/script.js'></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=");
          done();
        });
      });
      it("should add crossorigin attribute for a javascript file (single quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src='test/fixtures/script.js'></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("crossorigin=");
          done();
        });
      });
      it("should calculate 'sha256' hash for a javascript file (single quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src='test/fixtures/script.js'></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("sha256-DOkd/W7jLx2swQyb31v+kZ2Y9z7romuHeV9D9POBywA=");
          done();
        });
      });
      it("should calculate 'sha384' hash for a javascript file (single quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src='test/fixtures/script.js'></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("sha384-i2Zy8xcheu730XpEpNxLWtYctJ60DqnEaYmdxnueIa6on15NN/RKOMd++HVGTdKb");
          done();
        });
      });
      it("should calculate 'sha512' hash for a javascript file (single quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src='test/fixtures/script.js'></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("sha512-NH0m4Mws0R+H1MXESjogwfykAeH/bMaoVomwHbBH1AeLesxVIohIXA0HzqjW/5m0RIUnVpNZmiGL+jFkJu8doQ==");
          done();
        });
      });
      it("should add integrity attribute for a javascript file (no quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=test/fixtures/script.js></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=");
          done();
        });
      });
      it("should add crossorigin attribute for a javascript file (no quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=test/fixtures/script.js></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("crossorigin=");
          done();
        });
      });
      it("should calculate 'sha256' hash for a javascript file (no quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=test/fixtures/script.js></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("sha256-DOkd/W7jLx2swQyb31v+kZ2Y9z7romuHeV9D9POBywA=");
          done();
        });
      });
      it("should calculate 'sha384' hash for a javascript file (no quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=test/fixtures/script.js></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("sha384-i2Zy8xcheu730XpEpNxLWtYctJ60DqnEaYmdxnueIa6on15NN/RKOMd++HVGTdKb");
          done();
        });
      });
      it("should calculate 'sha512' hash for a javascript file (no quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=test/fixtures/script.js></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("sha512-NH0m4Mws0R+H1MXESjogwfykAeH/bMaoVomwHbBH1AeLesxVIohIXA0HzqjW/5m0RIUnVpNZmiGL+jFkJu8doQ==");
          done();
        });
      });
    });
  });
});
