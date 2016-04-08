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
    if (isWin32) {
        return filePath.win32(path);
    } else {
        return filePath.posix(path);
    }
};

filePath.posix = function(path) {
    var parts;

    if (reWin32.test(path)) {
        parts = pathUtils.trim(win32.normalize(path).split(win32.separator));

        if (win32.isAbsolute(path)) {
            parts.shift();
            return "/" + parts.join(posix.separator);
        } else {
            return parts.join(posix.separator);
        }
    } else {
        return posix.normalize(path);
    }
};

filePath.win32 = function(path) {
    var parts;

    if (rePosix.test(path)) {
        parts = pathUtils.trim(posix.normalize(path).split(posix.separator));

        if (posix.isAbsolute(path)) {
            return "c:\\" + parts.join(win32.separator);
        } else {
            return parts.join(win32.separator);
        }
    } else {
        return win32.normalize(path);
    }
};


module.exports = filePath;
