base64 encoding
=======

base64 encoding/decoding for the browser and node.js

```javascript
var base64 = require("base64_encoding");


base64.stringToBytes(
    "dGhpcyBpcyBhIHRlc3Q="
) === [116, 104, 105, 115, 32, 105, 115, 32, 97, 32, 116, 101, 115, 116];

base64.bytesToString(
    [116, 104, 105, 115, 32, 105, 115, 32, 97, 32, 116, 101, 115, 116]
) === "dGhpcyBpcyBhIHRlc3Q=";
```
