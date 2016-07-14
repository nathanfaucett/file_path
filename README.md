filePath
=======

file path utils for the browser and node.js

```javascript
var filePath = require("@nathanfaucett/file_path");


filePath.isAbsolute("../path") === false;
filePath.isAbsolute("path") === false;
filePath.isAbsolute("/path") === true;

filePath.normalize("//base//path///to") === "/base/path/to";

filePath.resolve("/base/path/to", "../", "./") === "/base/path";

filePath.relative("/base/path", "/base/path/home") === "home";

filePath.join("/base/path", "./home") === "/base/path/home";

filePath.dirname("/base/path/file") === "/base/path";

filePath.basename("/base/path/file") === "file";
filePath.basename("/base/path/file.js") === "file.js";

filePath.extname("/base/path/file.js") === ".js";
```
