var assert = require("assert"),
    base64 = require("../src/index");


describe("base64_encoding", function() {
    describe("#stringToBytes(str)", function() {
        it("should return string to bytes", function() {
            assert.deepEqual(
                base64.stringToBytes("dGhpcyBpcyBhIHRlc3Q="),
                [116, 104, 105, 115, 32, 105, 115, 32, 97, 32, 116, 101, 115, 116]
            );
        });
    });
    describe("#bytesToString(bytes)", function() {
        it("should return bytes to string", function() {
            assert.deepEqual(
                base64.bytesToString([116, 104, 105, 115, 32, 105, 115, 32, 97, 32, 116, 101, 115, 116]),
                "dGhpcyBpcyBhIHRlc3Q="
            );
        });
    });
});
