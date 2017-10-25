var fs = require("fs");
var util = require("gulp-util");
var path = require("path");
var es = require("event-stream");
var expect = require("chai").expect;
var sinon = require("sinon");
var phpinc = require("../");

describe("gulp-sri-php",function() {
  it("should be awesome",function() {
    expect(1).to.equal(1); //always true
  });
  describe("isNull()",function() {
    it("should do nothing",function(done) {
      var temp = new util.File(null);
      var stream = phpinc();
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
      var stream = phpinc();
      expect(function() {
        stream.write(temp);
      }).to.throw("not supported");
      done();
    });
  });
  describe("isBuffer()",function() {
    it("should *not* change other php code",function(done) {
      var floc = path.normalize(process.cwd()+"/index.php");
      var temp = new util.File({contents:new Buffer("<html><?php echo('test');?></html>"),path:floc});
      var stream = phpinc();
      stream.write(temp);
      stream.once("data",function(file) {
        expect(file.isBuffer()).to.be.true;
        expect(file.contents.toString()).to.contain("echo('test');");
        done();
      });
    });
  });
});
