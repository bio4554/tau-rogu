import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";
import * as tokenService from "../services/token.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log("username or password was null");
      // TODO dont log password
      console.log(`USER: ${username} PASS: ${password}`);
      res.status(400).send({ message: "Malformed request" });
      return;
    }

    const response = await authService.createNewUser(username, password);
    if (response === undefined) {
      res.status(400).send({ message: "Username taken" });
    }
    res.status(201).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Check the log for more details" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log("username or password was null");
      // TODO dont log password
      console.log(`USER: ${username} PASS: ${password}`);
      res.status(400).send({ message: "Malformed request" });
      return;
    }

    const response = await authService.loginUser(username, password);
    if (!response) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }

    const token = await tokenService.signJwt(response, "access");
    res.status(200).send({ accessToken: token, user: response });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Check the log for more details" });
  }
};
