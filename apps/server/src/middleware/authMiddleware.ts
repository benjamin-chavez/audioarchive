// apps/server/src/middleware/authMiddleware.ts

// import asyncHandler from 'express-async-handler';
// import { Request } from 'express';
// const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// const { expressjwt: jwt } = require('express-jwt');
// const jwksRsa = require('jwks-rsa');
// require('dotenv').config();
// // imp
// import { UnauthorizedError as CustomUnauthorizedError } from './customErrors';

import 'dotenv/config';

import { GetVerificationKey, expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { UnauthorizedError as CustomUnauthorizedError } from './customErrors';

const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE;

// export const protect = asyncHandler(async (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }

//   res.status(401);
//   throw new Error('Not authorized');
// });

// export const admin = asyncHandler(async (req: Request, res, next) => {
//   // @ts-ignore
//   if (req.user && req.user.isAdmin) {
//     return next();
//   }

//   res.status(401);
//   throw new Error('Not authorized as Admin');
// });

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
// const jwtCheck = auth({
// export const checkJwt = auth({
//   audience: 'http://localhost:5000/',
//   issuerBaseURL: `https://dev-fe4e0mvsji0bzexh.us.auth0.com/`,
//   tokenSigningAlg: 'RS256',
// });

const jwtMiddleware = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuerBaseUrl}/.well-known/jwks.json`,
  }) as GetVerificationKey,

  audience: audience,
  issuer: `${issuerBaseUrl}/`,
  algorithms: ['RS256'],
});

export const checkJwt = (req, res, next) => {
  jwtMiddleware(req, res, (error) => {
    if (error && error.name === 'UnauthorizedError') {
      next(new CustomUnauthorizedError(error.message));
    } else {
      next(error);
    }
  });
};
