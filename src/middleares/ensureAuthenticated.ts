import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number,
  exp: number,
  sub: string,
  role: string,
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Missing JWT token.');
  }

  const [_, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub, role } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
      role: role,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token.');
  }
}
