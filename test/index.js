var tape = require("tape"),
    filePath = require("..");
    

if (process.platform === "win32" || process.platform === "windows") {
    module.exports = require("./win32");
} else {
    module.exports = require("./posix");
}

tape("filePath.posix(path)",function(assert) {
    assert.equal(filePath.posix("path"), "path");
    assert.equal(filePath.posix(".\\path\\to\\"), "path/to");
    assert.equal(filePath.posix("c:\\path\\to\\"), "/path/to");
    assert.equal(filePath.posix("/path/to"), "/path/to");
    assert.end();
});

tape("filePath.win32(path)",function(assert) {
    assert.equal(filePath.win32("path"), "path");
    assert.equal(filePath.win32("./path/to/"), "path\\to");
    assert.equal(filePath.win32("/path/to/"), "c:\\path\\to");
    assert.equal(filePath.win32("c:\\path\\to"), "c:\\path\\to");
    assert.end();
});
