import {UserValidationResult} from "./user";
import jwt = require('jsonwebtoken');

export function verifyToken(req, res): Promise<UserValidationResult> {
  return new Promise<UserValidationResult>((resolve, reject) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      err ? reject(err) : resolve(authData);
    });
  });
}

export function verifyHeader(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    req.token = bearer[1];
    next();
  } else {
    res.sendStatus(403);
  }
}