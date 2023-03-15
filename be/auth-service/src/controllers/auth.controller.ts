import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const response = await authService.createNewUser(username, password);
  res.status(201).send(response);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).send();
};
