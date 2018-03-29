import express = require('express')
import bodyParser = require('body-parser')
import jwt = require('jsonwebtoken');
import {UserValidationResult, validateUser} from "./utils/user";
import {User} from "./models/user";
import cors = require('cors')
import {verifyHeader, verifyToken} from "./utils/jwt";
import {tables} from "./utils/db";

const pgp = require("pg-promise")();
const db = pgp("postgres://esqsta:BNLKBR=9bikDA305@dev-postgres.esq.dev.renault-digital.com:5432/esq_sta");
const PS = require('pg-promise').PreparedStatement;

const app = express();
app.use(cors());
app.use(bodyParser.json());




app.get('/api', (req, res) => {
  res.json({ version: '1.0.0' });
});

app.post('/api/posts', verifyHeader, (req, res) => {
  verifyToken(req, res)
    .then(data => {
      console.log("authData", data);
      res.json(data);
    })
    .catch(error => {
      res.sendStatus(403);
  });
});

app.get('/api/data/:table', verifyHeader, (req, res) => {
  console.log("params", req.params);

  verifyToken(req, res)
    .then(data => {return processData(req.params.table) })
    .then(function (data) {
      console.log("DATA:", data );
      res.json({
        type: req.params.table,
        result: data
      });
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(403);
    });
});

app.post('/api/auth', (req, res) => {

  let result: UserValidationResult = validateUser( <User> {
    email: req.body.email,
    password: req.body.password
  } );

  if ( result.valid ) {

    console.log(result);
    jwt.sign(result, 'secretkey', { expiresIn: '3000s' }, (err, token) => {
      console.log("token: ", token);
      res.json({ token });
    });
  } else {
    res.sendStatus(403);
  }
});


function processData(table: string) {
  let query = 'SELECT * from ' + table;

  if ( tables.indexOf(table.toLocaleLowerCase()) == -1  ){
    query = 'SELECT * from CURRENT_TIMESTAMP'
  }

  return db.manyOrNone(query)

}

app.listen(8080);