var tape = require("tape"),
    filePath = require("..");

tape("filePath.isAbsolute(path)",function(assert) {
    assert.equal(filePath.isAbsolute("..\\path"), false, "should not be absolute");
    assert.equal(filePath.isAbsolute("path"), false, "should not be absolute");
    assert.equal(filePath.isAbsolute("c:\\path"), true, "should be absolute");
    assert.end();
});

tape("filePath.root(path)",function(assert) {
    assert.equal(filePath.root("..\\path"), "c:\\");
    assert.equal(filePath.root("path"), "c:\\");
    assert.equal(filePath.root("c:\\path"), "c:\\");
    assert.end();
});
    
tape("filePath.normalize(path)",function(assert) {
    assert.equal(filePath.normalize("c:\\base\\\\path\\\\\\to"), "c:\\base\\path\\to", "should remove double slashes");
    assert.end();
});

tape("filePath.resolve(...paths)",function(assert) {
    assert.equal(filePath.resolve("c:\\base\\path\\to", "..\\", ".\\"), "c:\\base\\path", "should resolve paths from left to right");
    assert.end();
});

tape("filePath.relative(from, to)",function(assert) {
    assert.equal(filePath.relative("c:\\base\\path", "c:\\base\\path\\home"), "home", "should return relative path");
    assert.end();
});

tape("filePath.join(...paths)",function(assert) {
    assert.equal(filePath.join("c:\\base\\path", ".\\home"), "c:\\base\\path\\home", "should join all paths from left to right");
    assert.end();
});

tape("filePath.dirname(path)",function(assert) {
    assert.equal(filePath.dirname("c:\\base\\path\\file"), "c:\\base\\path", "should return dirname");
    assert.end();
});

tape("filePath.basename(path)",function(assert) {
    assert.equal(filePath.basename("c:\\base\\path\\file"), "file", "should return basename without ext");
    assert.equal(filePath.basename("c:\\base\\path\\file.js"), "file.js", "should return basename");
    assert.end();
});

tape("filePath.extname(path)",function(assert) {
    assert.equal(filePath.extname("c:\\base\\path\\file.js"), ".js", "should return extname");
    assert.end();
});