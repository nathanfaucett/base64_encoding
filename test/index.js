var tape = require("tape"),
    base64 = require("..");


tape("base64_encoding #stringToBytes(str)", function(assert) {
    assert.deepEqual(
        base64.stringToBytes("dGhpcyBpcyBhIHRlc3Q="), [116, 104, 105, 115, 32, 105, 115, 32, 97, 32, 116, 101, 115, 116],
        "should return string to bytes"
    );
    assert.end();
});

tape("base64_encoding #bytesToString(bytes)", function(assert) {
    assert.deepEqual(
        base64.bytesToString([116, 104, 105, 115, 32, 105, 115, 32, 97, 32, 116, 101, 115, 116]),
        "dGhpcyBpcyBhIHRlc3Q=",
        "should return bytes to string"
    );
    assert.end();
});
