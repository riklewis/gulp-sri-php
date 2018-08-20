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
      it("should add integrity attribute to a javascript tag (double quotes)",function(done) {
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
      it("should add crossorigin attribute to a javascript tag (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("crossorigin=\"anonymous\"");
          done();
        });
      });
      it("should calculate 'sha256' hash (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.satisfy(function(cont) {
            return (cont.indexOf("sha256-DOkd/W7jLx2swQyb31v+kZ2Y9z7romuHeV9D9POBywA=")>-1 || cont.indexOf("sha256-C/9puvD3ClALXJ/dr62pxW460rFsss/VepWvS7JDOUo=")>-1); //LF or CRLF
          });
          done();
        });
      });
      it("should calculate 'sha384' hash (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.satisfy(function(cont) {
            return (cont.indexOf("sha384-i2Zy8xcheu730XpEpNxLWtYctJ60DqnEaYmdxnueIa6on15NN/RKOMd++HVGTdKb")>-1 || cont.indexOf("sha384-1NEQr6gLV3AKXyIou2LhPBN3hZRUPSRonReLRtMntlhvCCt73RxujSDBDrdNaM/U")>-1); //LF or CRLF
          });
          done();
        });
      });
      it("should calculate 'sha512' hash (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.satisfy(function(cont) {
            return (cont.indexOf("sha512-NH0m4Mws0R+H1MXESjogwfykAeH/bMaoVomwHbBH1AeLesxVIohIXA0HzqjW/5m0RIUnVpNZmiGL+jFkJu8doQ==")>-1 || cont.indexOf("sha512-68gQgFNeo3o1j/fyEySr6lReFf182IsYPW5YqwFlQPJz3ZuXgXciZ1POJHxwK9+aDU3PeCYOjaV0/CYeIYRk9g==")>-1); //LF or CRLF
          });
          done();
        });
      });
      it("should add integrity attribute to a javascript tag (single quotes)",function(done) {
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
      it("should add crossorigin attribute to a javascript tag (single quotes)",function(done) {
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
      it("should calculate 'sha256' hash (single quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src='test/fixtures/script.js'></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.satisfy(function(cont) {
            return (cont.indexOf("sha256-DOkd/W7jLx2swQyb31v+kZ2Y9z7romuHeV9D9POBywA=")>-1 || cont.indexOf("sha256-C/9puvD3ClALXJ/dr62pxW460rFsss/VepWvS7JDOUo=")>-1); //LF or CRLF
          });
          done();
        });
      });
      it("should calculate 'sha384' hash (single quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src='test/fixtures/script.js'></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.satisfy(function(cont) {
            return (cont.indexOf("sha384-i2Zy8xcheu730XpEpNxLWtYctJ60DqnEaYmdxnueIa6on15NN/RKOMd++HVGTdKb")>-1 || cont.indexOf("sha384-1NEQr6gLV3AKXyIou2LhPBN3hZRUPSRonReLRtMntlhvCCt73RxujSDBDrdNaM/U")>-1); //LF or CRLF
          });
          done();
        });
      });
      it("should calculate 'sha512' hash (single quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src='test/fixtures/script.js'></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.satisfy(function(cont) {
            return (cont.indexOf("sha512-NH0m4Mws0R+H1MXESjogwfykAeH/bMaoVomwHbBH1AeLesxVIohIXA0HzqjW/5m0RIUnVpNZmiGL+jFkJu8doQ==")>-1 || cont.indexOf("sha512-68gQgFNeo3o1j/fyEySr6lReFf182IsYPW5YqwFlQPJz3ZuXgXciZ1POJHxwK9+aDU3PeCYOjaV0/CYeIYRk9g==")>-1); //LF or CRLF
          });
          done();
        });
      });
      it("should add integrity attribute to a javascript tag with a cache busting hash",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js?cbh=1234\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=");
          done();
        });
      });
      it("should add integrity attribute to a javascript tag with a self closing tag",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js?cbh=1234\" /></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=");
          done();
        });
      });
      it("should *not* set the integrity attribute if it already exists",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js\" integrity=\"test\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=\"test\"");
          done();
        });
      });
      it("should *not* set the crossorigin attribute if it already exists",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js\" crossorigin=\"test\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("crossorigin=\"test\"");
          done();
        });
      });
      it("should *not* modify any other attributes in the tag (value pair)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js\" test=\"test\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("test=\"test\"");
          done();
        });
      });
      it("should *not* modify any other attributes in the tag (minimised)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"test/fixtures/script.js\" test></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("test");
          done();
        });
      });
      it("should *not* add integrity attribute to a tag with an external file (https://)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"https://test.com/script.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("integrity");
          done();
        });
      });
      it("should *not* add integrity attribute to a tag with an external file (http://)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"http://test.com/script.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("integrity");
          done();
        });
      });
      it("should *not* add integrity attribute to a tag with an external file (//)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"//test.com/script.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("integrity");
          done();
        });
      });
      it("should *not* add integrity attribute to a tag with an invalid/missing file",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"missing.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("integrity");
          done();
        });
      });
      it("should *not* add integrity attribute to a tag with blank src value",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><script src=\"\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("integrity");
          done();
        });
      });
    });
    describe("File: Stylesheet (.css)",function() {
      it("should add integrity attribute (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=");
          done();
        });
      });
      it("should add crossorigin attribute (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("crossorigin=");
          done();
        });
      });
      it("should calculate 'sha256' hash (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.satisfy(function(cont) {
            return (cont.indexOf("sha256-JCGd+S1MWDg5GctikFvioRZbk7zIiTJUpQTK0s2M3lM=")>-1 || cont.indexOf("sha256-kxIB3+tJkVrWzTR5pv1Thudusy5b9fbh9M10oBgKFuw=")>-1); //LF or CRLF
          });
          done();
        });
      });
      it("should calculate 'sha384' hash (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.satisfy(function(cont) {
            return (cont.indexOf("sha384-ZoZkZG8em6hlsSqs3rU3d1NUjVggKEZocST+T6YljUyMrkORaC1v/SpErp5ClzXH")>-1 || cont.indexOf("sha384-ygShAJV2Px1eG39+2qyXk79dziKUZASMT1JsVD26Zd2/0o/jCVvRbuB6QF/2vv/6")>-1); //LF or CRLF
          });
          done();
        });
      });
      it("should calculate 'sha512' hash (double quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.satisfy(function(cont) {
            return (cont.indexOf("sha512-JC21+u0QC09tZZrj4vj1Oyh7rbYTt1dmWQoi1+A5fbilGVwegMHM2Zw74P0dhjASLyA54PKZMaH6cpUmXS3zxQ==")>-1 || cont.indexOf("sha512-ftB4mRK4C/3JM0BC/Q9q7FuPYth3lfiZnad+4TjkwhQE5Iwus0svLKUZePWsVF4BcHv5tqxAkSmtbbJlC1BbSQ==")>-1); //LF or CRLF
          });
          done();
        });
      });
      it("should add integrity attribute (single quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href='test/fixtures/style.css'></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=");
          done();
        });
      });
      it("should add crossorigin attribute (single quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href='test/fixtures/style.css'></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("crossorigin=");
          done();
        });
      });
      it("should calculate 'sha256' hash (single quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href='test/fixtures/style.css'></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.satisfy(function(cont) {
            return (cont.indexOf("sha256-JCGd+S1MWDg5GctikFvioRZbk7zIiTJUpQTK0s2M3lM=")>-1 || cont.indexOf("sha256-kxIB3+tJkVrWzTR5pv1Thudusy5b9fbh9M10oBgKFuw=")>-1); //LF or CRLF
          });
          done();
        });
      });
      it("should calculate 'sha384' hash (single quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href='test/fixtures/style.css'></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.satisfy(function(cont) {
            return (cont.indexOf("sha384-ZoZkZG8em6hlsSqs3rU3d1NUjVggKEZocST+T6YljUyMrkORaC1v/SpErp5ClzXH")>-1 || cont.indexOf("sha384-ygShAJV2Px1eG39+2qyXk79dziKUZASMT1JsVD26Zd2/0o/jCVvRbuB6QF/2vv/6")>-1); //LF or CRLF
          });
          done();
        });
      });
      it("should calculate 'sha512' hash (single quotes)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href='test/fixtures/style.css'></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.satisfy(function(cont) {
            return (cont.indexOf("sha512-JC21+u0QC09tZZrj4vj1Oyh7rbYTt1dmWQoi1+A5fbilGVwegMHM2Zw74P0dhjASLyA54PKZMaH6cpUmXS3zxQ==")>-1 || cont.indexOf("sha512-ftB4mRK4C/3JM0BC/Q9q7FuPYth3lfiZnad+4TjkwhQE5Iwus0svLKUZePWsVF4BcHv5tqxAkSmtbbJlC1BbSQ==")>-1); //LF or CRLF
          });
          done();
        });
      });
      it("should add integrity attribute with a cache busting hash",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css?cbh=1234\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=");
          done();
        });
      });
      it("should add integrity attribute with a self closing tag",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css?cbh=1234\" /></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=");
          done();
        });
      });
      it("should add integrity attribute for alternate stylesheet",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"alternate stylesheet\" href=\"test/fixtures/style.css\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=");
          done();
        });
      });
      it("should *not* set the integrity attribute if it already exists",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\" integrity=\"test\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=\"test\"");
          done();
        });
      });
      it("should *not* set the crossorigin attribute if it already exists",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\" crossorigin=\"test\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("crossorigin=\"test\"");
          done();
        });
      });
      it("should *not* modify any other attributes in the tag (value pair)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\" test=\"test\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("test=\"test\"");
          done();
        });
      });
      it("should *not* modify any other attributes in the tag (minimised)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\" test></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("test");
          done();
        });
      });
      it("should *not* add integrity attribute to a tag with an external file (https://)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"https://test.com/style.css\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("integrity");
          done();
        });
      });
      it("should *not* add integrity attribute to a tag with an external file (http://)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"http://test.com/style.css\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("integrity");
          done();
        });
      });
      it("should *not* add integrity attribute to a tag with an external file (//)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"//test.com/style.css\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("integrity");
          done();
        });
      });
      it("should *not* add integrity attribute to a tag with an invalid/missing file",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"missing.css\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("integrity");
          done();
        });
      });
      it("should *not* add integrity attribute to a tag with blank href value",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"\"></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("integrity");
          done();
        });
      });
    });
    describe("Option: algorithm",function() {
      it("should calculate 'sha256' hash only if specified (string)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash({algorithm:"sha256"});
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("sha256-");
          expect(file.contents.toString()).to.not.contain("sha384-");
          expect(file.contents.toString()).to.not.contain("sha512-");
          done();
        });
      });
      it("should calculate 'sha256' hash only if specified (array)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash({algorithm:["sha256"]});
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("sha256-");
          expect(file.contents.toString()).to.not.contain("sha384-");
          expect(file.contents.toString()).to.not.contain("sha512-");
          done();
        });
      });
      it("should calculate 'sha384' hash only if specified (string)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash({algorithm:"sha384"});
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("sha256-");
          expect(file.contents.toString()).to.contain("sha384-");
          expect(file.contents.toString()).to.not.contain("sha512-");
          done();
        });
      });
      it("should calculate 'sha384' hash only if specified (array)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash({algorithm:["sha384"]});
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("sha256-");
          expect(file.contents.toString()).to.contain("sha384-");
          expect(file.contents.toString()).to.not.contain("sha512-");
          done();
        });
      });
      it("should calculate 'sha512' hash only if specified (string)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash({algorithm:"sha512"});
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("sha256-");
          expect(file.contents.toString()).to.not.contain("sha384-");
          expect(file.contents.toString()).to.contain("sha512-");
          done();
        });
      });
      it("should calculate 'sha512' hash only if specified (array)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash({algorithm:["sha512"]});
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.not.contain("sha256-");
          expect(file.contents.toString()).to.not.contain("sha384-");
          expect(file.contents.toString()).to.contain("sha512-");
          done();
        });
      });
      it("should throw an error - not supported (invalid type)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        expect(function() {
          var stream = srihash({algorithm:256});
          stream.write(temp);
        }).to.throw("not supported");
        done();
      });
      it("should throw an error - not supported (invalid string value)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        expect(function() {
          var stream = srihash({algorithm:"test"});
          stream.write(temp);
        }).to.throw("not supported");
        done();
      });
      it("should throw an error - not supported (invalid array value)",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        expect(function() {
          var stream = srihash({algorithm:["test"]});
          stream.write(temp);
        }).to.throw("not supported");
        done();
      });
    });
    describe("Option: verbose",function() {
      beforeEach(function() {
        sinon.spy(console,"log");
      });
      afterEach(function() {
        sinon.restore();
      });
      it("should add integrity attribute with verbose messaging off by default",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash();
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=");
          expect(console.log.notCalled).to.be.true;
          done();
        });
      });
      it("should add integrity attribute with verbose messaging off",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"><script src=\"test/fixtures/script.js\"></script><script src=\"test/fixtures/script.js\"></script></html>"),path:floc});
        var stream = srihash({verbose:false});
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=");
          expect(console.log.notCalled).to.be.true;
          done();
        });
      });
      it("should add integrity attribute with verbose messaging on",function(done) {
        var floc = path.normalize(process.cwd()+"/index.php");
        var temp = new util.File({contents:new Buffer("<html><link rel=\"stylesheet\" href=\"test/fixtures/style.css\"><script src=\"test/fixtures/script.js\"></script><script src=\"missing.js\"></script></html>"),path:floc});
        var stream = srihash({verbose:true});
        stream.write(temp);
        stream.once("data",function(file) {
          expect(file.isBuffer()).to.be.true;
          expect(file.contents.toString()).to.contain("integrity=");
          expect(console.log.called).to.be.true;
          done();
        });
      });
    });
  });
});
