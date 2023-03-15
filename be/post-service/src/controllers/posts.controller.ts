import { NextFunction, Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    const { title: string, description: string } = req.body;
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Check the log for details" });
  }
};
