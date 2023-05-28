const { expressjwt: jwt } = require('express-jwt');

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('JWT secret is missing. Please set the JWT_SECRET environment variable.');
}

const jwtMiddleware = jwt({
  secret: process.env.JWT_SECRET as string,
  algorithms: ['HS256'],
}).unless({
  path: [
    '/',
    '/api-docs',
    '/api-docs/*',
    '/user/login', 
    '/user/register', 
  ],
});

export default jwtMiddleware;