var pathUtils = require("path_utils"),
    posix = require("./posix"),
    win32 = require("./win32");


var isWin32 = process.platform === "win32" || process.platform === "windows",
    rePosix = /\//,
    reWin32 = /\\/,
    filePath;


if (isWin32) {
    filePath = win32;
} else {
    filePath = posix;
}


filePath.slash = function(path) {
    if (rePosix.test(path) && isWin32) {
        return slashFromTo(path, posix, win32, "c:\\");
    } else if (reWin32.test(path) && !isWin32) {
        return slashFromTo(path, win32, posix, "/");
    } else {
        return filePath.normalize(path);
    }
};

function slashFromTo(path, from, to, root) {
    var parts = pathUtils.trim(from.normalize(path).split(from.separator));

    if (from.isAbsolute(path)) {
        return to.join(root, parts.join(to.separator));
    } else {
        return parts.join(to.separator);
    }
}


module.exports = filePath;
