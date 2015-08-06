var tape = require("tape"),
    filePath = require("..");
    

tape("filePath.isAbsolute(path)",function(assert) {
    assert.equal(filePath.isAbsolute("../path"), false, "should not be absolute");
    assert.equal(filePath.isAbsolute("path"), false, "should not be absolute");
    assert.equal(filePath.isAbsolute("/path"), true, "should be absolute");
    assert.end();
});
    
tape("filePath.normalize(path)",function(assert) {
    assert.equal(filePath.normalize("//base//path///to"), "/base/path/to", "should remove double slashes");
    assert.end();
});

tape("filePath.resolve(...paths)",function(assert) {
    assert.equal(filePath.resolve("/base/path/to", "../", "./"), "/base/path", "should resolve paths from left to right");
    assert.end();
});

tape("filePath.relative(from, to)",function(assert) {
    assert.equal(filePath.relative("/base/path", "/base/path/home"), "home", "should return relative path");
    assert.end();
});

tape("filePath.join(...paths)",function(assert) {
    assert.equal(filePath.join("/base/path", "./home"), "/base/path/home", "should join all paths from left to right");
    assert.end();
});

tape("filePath.dirname(path)",function(assert) {
    assert.equal(filePath.dirname("/base/path/file"), "/base/path", "should return dirname");
    assert.end();
});

tape("filePath.basename(path)",function(assert) {
    assert.equal(filePath.basename("/base/path/file"), "file", "should return basename without ext");
    assert.equal(filePath.basename("/base/path/file.js"), "file.js", "should return basename");
    assert.end();
});

tape("filePath.extname(path)",function(assert) {
    assert.equal(filePath.extname("/base/path/file.js"), ".js", "should return extname");
    assert.end();
});