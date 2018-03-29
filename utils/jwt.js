"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
function verifyToken(req, res) {
    return new Promise(function (resolve, reject) {
        jwt.verify(req.token, 'secretkey', function (err, authData) {
            err ? reject(err) : resolve(authData);
        });
    });
}
exports.verifyToken = verifyToken;
function verifyHeader(req, res, next) {
    var bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        next();
    }
    else {
        res.sendStatus(403);
    }
}
exports.verifyHeader = verifyHeader;
