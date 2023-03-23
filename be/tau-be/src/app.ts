import * as dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import config from './app.config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import * as blobClient from './db/blob/blob.client';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

blobClient.checkBucket(config.BucketName);

const app = express();
const port = parseInt(config.Port);
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/', routes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
