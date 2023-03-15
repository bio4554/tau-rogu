import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import helmet from "helmet";
import config from "./app.config";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = parseInt(config.Port);
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
