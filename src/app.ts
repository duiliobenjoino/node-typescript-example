import { errorHandler } from './app/controllers/ErrorHandler';
import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";
import routes from "./app/controllers/routes";

import "dotenv/config";

const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandler);

export { app };