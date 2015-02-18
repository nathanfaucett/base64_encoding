var base64 = exports,

    base64Strings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),

    PLUS = "+".charCodeAt(0),
    SLASH = "/".charCodeAt(0),
    NUMBER = "0".charCodeAt(0),
    LOWER = "a".charCodeAt(0),
    UPPER = "A".charCodeAt(0),
    PLUS_URL_SAFE = "-".charCodeAt(0),
    SLASH_URL_SAFE = "_".charCodeAt(0),

    NativeUint8Array = typeof(Uint8Array) !== "undefined" ? Uint8Array : Array;


function decode(ch) {
    var code = ch.charCodeAt(0);

    if (code === PLUS || code === PLUS_URL_SAFE) {
        return 62;
    } else if (code === SLASH || code === SLASH_URL_SAFE) {
        return 63;
    } else if (code < NUMBER) {
        return -1;
    } else if (code < NUMBER + 10) {
        return code - NUMBER + 26 + 26;
    } else if (code < UPPER + 26) {
        return code - UPPER;
    } else if (code < LOWER + 26) {
        return code - LOWER + 26;
    } else {
        return code;
    }
}

base64.stringToBytes = function(str) {
    var i, j, tmp, placeHolders, strLength, length, bytes, index;

    if (str.length % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
    }

    strLength = str.length;
    placeHolders = str.charAt(strLength - 2) === "=" ? 2 : str.charAt(strLength - 1) === "=" ? 1 : 0;

    bytes = new NativeUint8Array(strLength * 3 / 4 - placeHolders);
    length = placeHolders > 0 ? strLength - 4 : strLength;
    index = 0;

    i = 0;
    j = 0;

    while (i < length) {
        tmp = (
            (decode(str.charAt(i)) << 18) |
            (decode(str.charAt(i + 1)) << 12) |
            (decode(str.charAt(i + 2)) << 6) |
            decode(str.charAt(i + 3))
        );
        bytes[index++] = ((tmp & 0xFF0000) >> 16);
        bytes[index++] = ((tmp & 0xFF00) >> 8);
        bytes[index++] = (tmp & 0xFF);

        i += 4;
        j += 3;
    }

    if (placeHolders === 2) {
        tmp = (decode(str.charAt(i)) << 2) | (decode(str.charAt(i + 1)) >> 4);
        bytes[index++] = (tmp & 0xFF);
    } else if (placeHolders === 1) {
        tmp = (decode(str.charAt(i)) << 10) | (decode(str.charAt(i + 1)) << 4) | (decode(str.charAt(i + 2)) >> 2);
        bytes[index++] = ((tmp >> 8) & 0xFF);
        bytes[index++] = (tmp & 0xFF);
    }

    return bytes;
};

function encode(num) {
    return base64Strings[num];
}

function tripletToBase64(num) {
    return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
}

base64.bytesToString = function(bytes) {
    var length = bytes.length,
        extraBytes = length % 3,
        output = "",
        i = 0,
        il = length - extraBytes,
        temp;

    while (i < il) {
        temp = (bytes[i] << 16) + (bytes[i + 1] << 8) + (bytes[i + 2]);
        output += tripletToBase64(temp);
        i += 3;
    }

    if (extraBytes === 1) {
        temp = bytes[length - 1];
        output += encode(temp >> 2);
        output += encode((temp << 4) & 0x3F);
        output += "==";
    } else if (extraBytes === 2) {
        temp = (bytes[length - 2] << 8) + (bytes[length - 1]);
        output += encode(temp >> 10);
        output += encode((temp >> 4) & 0x3F);
        output += encode((temp << 2) & 0x3F);
        output += "=";
    }

    return output;
};
