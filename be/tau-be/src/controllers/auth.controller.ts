import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';
import * as authService from '../services/auth.service';
import * as tokenService from '../services/token.service';

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('username or password was null');
      // TODO dont log password
      console.log(`USER: ${username} PASS: ${password}`);
      res.status(400).send({
        message: 'Malformed request'
      });
      return;
    }

    const response = await authService.createNewUser(username, password);
    if (response === undefined) {
      res.status(400).send({
        message: 'Username taken'
      });
      return;
    }
    const accessToken = await tokenService.signJwt(response, 'access');
    const refreshToken = await tokenService.signJwt(response, 'refresh');
    res.cookie('refresh-token', refreshToken, {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      expires: dayjs().add(30, 'days').toDate()
    });
    res.status(201).send({
      accessToken: accessToken,
      user: response
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Check the log for more details'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('username or password was null');
      // TODO dont log password
      console.log(`USER: ${username} PASS: ${password}`);
      res.status(400).send({
        message: 'Malformed request'
      });
      return;
    }

    const response = await authService.loginUser(username, password);
    if (!response) {
      res.status(401).send({
        message: 'Unauthorized'
      });
      return;
    }

    const accessToken = await tokenService.signJwt(response, 'access');
    const refreshToken = await tokenService.signJwt(response, 'refresh');
    res.cookie('refreshToken', refreshToken, {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      expires: dayjs().add(30, 'days').toDate()
    });
    res.status(200).send({
      accessToken: accessToken,
      user: response
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Check the log for more details'
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const cookie = req.cookies.refreshToken;

    if (!cookie) {
      console.log('no refresh token');
      res.status(401).send({
        message: 'Unauthorized'
      });
      return;
    }

    var token;
    try {
      token = await tokenService.verifyJwt(cookie, 'refresh');
    } catch {
      console.log('invalid jwt');
      res.status(401).send({
        message: 'Unauthorized'
      });
      return;
    }

    const refresh = await authService.getRefresh(token.id);

    if (!refresh.valid) {
      console.log('token is marked invalid in db');
      res.status(401).send({
        message: 'Unauthorized'
      });
      return;
    }

    const user = await authService.getUser(refresh.user_id);

    const accessToken = await tokenService.signJwt(
      {
        id: user.id,
        name: user.name,
        password: undefined
      },
      'access'
    );
    const refreshToken = await tokenService.signJwt(
      {
        id: user.id,
        name: user.name,
        password: undefined
      },
      'refresh'
    );
    res.cookie('refreshToken', refreshToken, {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      expires: dayjs().add(30, 'days').toDate()
    });
    res.status(200).send({
      accessToken: accessToken,
      user: user
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Check the log for more details'
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const cookie = req.cookies.refreshToken;

    if (!cookie) {
      console.log('no refresh token');
      res.status(401).send({
        message: 'Unauthorized'
      });
      return;
    }

    var token;
    try {
      token = await tokenService.verifyJwt(cookie, 'refresh');
    } catch {
      console.log('invalid jwt');
      res.status(401).send({
        message: 'Unauthorized'
      });
      return;
    }

    const refresh = await authService.getRefresh(token.id);

    if (!refresh.valid) {
      console.log('token is marked invalid in db');
      res.status(401).send({
        message: 'Unauthorized'
      });
      return;
    }

    await authService.invalidateRefresh(refresh.user_id);

    res.status(200).send({ message: 'Logged out user' });
  } catch (error) {}
};

export const validate = async (req: Request, res: Response) => {
  try {
  } catch (err) {}
};
