if (process.platform === "win32" || process.platform === "windows") {
    module.exports = require("./win32");
} else {
    module.exports = require("./posix");
}
