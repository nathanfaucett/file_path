var isString = require("is_string"),
    defineProperty = require("define_property"),
    pathUtils = require("path_utils");


var posix = exports;


defineProperty(posix, "separator", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: "/"
});
defineProperty(posix, "delimiter", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: ":"
});


posix.isAbsolute = function(path) {
    return path[0] === "/";
};

posix.normalize = function(str) {
    var isAbs = posix.isAbsolute(str),
        trailingSlash = str[str.length - 1] === "/",
        segments = str.split("/"),
        nonEmptySegments = [],
        i = -1,
        il = segments.length - 1,
        segment;

    while (i++ < il) {
        segment = segments[i];

        if (segment) {
            nonEmptySegments.push(segment);
        }
    }
    str = pathUtils.normalizeArray(nonEmptySegments, !isAbs).join("/");

    if (!str && !isAbs) {
        str = ".";
    }
    if (str && trailingSlash) {
        str += "/";
    }

    return (isAbs ? "/" : "") + str;
};

posix.resolve = function() {
    var resolvedPath = "",
        resolvedAbsolute = false,
        i, str;

    for (i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        str = (i >= 0) ? arguments[i] : process.cwd();

        if (!isString(str)) {
            throw new TypeError("Arguments to path.resolve must be strings");
        } else if (!str) {
            continue;
        }

        resolvedPath = str + "/" + resolvedPath;
        resolvedAbsolute = str[0] === "/";
    }

    resolvedPath = pathUtils.normalizeArray(pathUtils.removeEmpties(resolvedPath.split("/")), !resolvedAbsolute).join("/");

    return ((resolvedAbsolute ? "/" : "") + resolvedPath) || ".";
};

posix.relative = function(from, to) {
    from = posix.resolve(from).substr(1);
    to = posix.resolve(to).substr(1);

    var fromParts = pathUtils.trim(from.split("/")),
        toParts = pathUtils.trim(to.split("/")),

        length = Math.min(fromParts.length, toParts.length),
        samePartsLength = length,
        outputParts, i, il;

    for (i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
        }
    }

    outputParts = [];
    for (i = samePartsLength, il = fromParts.length; i < il; i++) {
        outputParts.push("..");
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join("/");
};

posix.join = function() {
    var str = "",
        segment,
        i, il;

    for (i = 0, il = arguments.length; i < il; i++) {
        segment = arguments[i];

        if (!isString(segment)) {
            throw new TypeError("Arguments to join must be strings");
        }
        if (segment) {
            if (!str) {
                str += segment;
            } else {
                str += "/" + segment;
            }
        }
    }

    return posix.normalize(str);
};

posix.dir = function(str) {
    str = str.substring(0, str.lastIndexOf("/") + 1);
    return str ? str.substr(0, str.length - 1) : ".";
};

posix.dirname = posix.dir;

posix.base = function(str, ext) {
    str = str.substring(str.lastIndexOf("/") + 1);

    if (ext && str.substr(-ext.length) === ext) {
        str = str.substr(0, str.length - ext.length);
    }

    return str || "";
};

posix.basename = posix.base;

posix.ext = function(str) {
    var index = str.lastIndexOf(".");
    return index > -1 ? str.substring(index) : "";
};

posix.extname = posix.ext;
