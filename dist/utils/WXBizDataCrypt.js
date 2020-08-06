"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function WXBizDataCrypt(appId, sessionKey) {
    this.appId = appId;
    this.sessionKey = sessionKey;
}
WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
    var sessionKey = new Buffer(this.sessionKey, 'base64');
    encryptedData = new Buffer(encryptedData, 'base64');
    iv = new Buffer(iv, 'base64');
    try {
        var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
        decipher.setAutoPadding(true);
        var decoded = decipher.update(encryptedData, 'binary', 'utf8');
        decoded += decipher.final('utf8');
        decoded = JSON.parse(decoded);
    }
    catch (err) {
        throw new Error('Illegal Buffer');
    }
    if (decoded.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer');
    }
    return decoded;
};
exports.default = WXBizDataCrypt;
