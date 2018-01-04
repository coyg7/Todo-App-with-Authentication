import * as jwt from '../utils/jwt';

function ensureToken(req, res, next) {
  req.token = jwt.verifyAccessToken(req.headers.authorization);
  next();
}

export { ensureToken };
