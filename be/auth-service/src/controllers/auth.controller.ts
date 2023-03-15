import { NextFunction, Request, Response } from "express";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(201).send();
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).send();
};
