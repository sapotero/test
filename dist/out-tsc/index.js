"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var user_1 = require("./utils/user");
var cors = require("cors");
var jwt_1 = require("./utils/jwt");
var db_1 = require("./utils/db");
var pgp = require("pg-promise")();
var db = pgp("postgres://esqsta:BNLKBR=9bikDA305@dev-postgres.esq.dev.renault-digital.com:5432/esq_sta");
var PS = require('pg-promise').PreparedStatement;
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/api', function (req, res) {
    res.json({ version: '1.0.0' });
});
app.post('/api/posts', jwt_1.verifyHeader, function (req, res) {
    jwt_1.verifyToken(req, res)
        .then(function (data) {
        console.log("authData", data);
        res.json(data);
    })
        .catch(function (error) {
        res.sendStatus(403);
    });
});
app.get('/api/data/:table', jwt_1.verifyHeader, function (req, res) {
    console.log("params", req.params);
    jwt_1.verifyToken(req, res)
        .then(function (data) { return processData(req.params.table); })
        .then(function (data) {
        console.log("DATA:", data);
        res.json({
            type: req.params.table,
            result: data
        });
    })
        .catch(function (error) {
        console.log(error);
        res.sendStatus(403);
    });
});
app.post('/api/auth', function (req, res) {
    var result = user_1.validateUser({
        email: req.body.email,
        password: req.body.password
    });
    if (result.valid) {
        console.log(result);
        jwt.sign(result, 'secretkey', { expiresIn: '3000s' }, function (err, token) {
            console.log("token: ", token);
            res.json({ token: token });
        });
    }
    else {
        res.sendStatus(403);
    }
});
function processData(table) {
    var query = 'SELECT * from ' + table;
    if (db_1.tables.indexOf(table.toLocaleLowerCase()) == -1) {
        query = 'SELECT * from CURRENT_TIMESTAMP';
    }
    return db.manyOrNone(query);
}
app.listen(8080);
//# sourceMappingURL=index.js.map