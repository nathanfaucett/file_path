if (process.platform === "win32" || process.platform === "windows") {
    module.exports = require("./windows");
} else {
    module.exports = require("./posix");
}
