import jwt from 'jsonwebtoken';
import authConfing from '@/config/auth';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const tokenData = authHeader.split(' ');
    if (tokenData.length != 2) {
      return res.status(401).send({ error: 'No valid token provided' });
    }

    const [scheme, token] = tokenData;
    if (scheme.indexOf('Bearer') < 0) {
      return res.status(401).send({ error: 'No valid token provided' });
    }

    jwt.verify(token, authConfing.secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ error: 'No valid token provided' });
      } else {
        req.user = decoded;
        req.uid = decoded.uid;
        return next();
      }
    });
  } else {
    return res.status(401).send({ error: 'No valid token provided' });
  }
};
