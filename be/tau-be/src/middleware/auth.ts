import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import * as tokenService from '../services/token.service';
import { Request, Response, NextFunction } from 'express';
import config from '../app.config';

export interface AuthRequest extends Request {
  token: JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('no token in request');
    }

    const decoded = await tokenService.verifyJwt(token, 'access');
    (req as AuthRequest).token = decoded;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: 'Unauthorized' });
  }
};
