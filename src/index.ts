import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { environment } from './config/environment';
import connectToDatabase from "./config/database";
dotenv.config();

const app: Express = express();
const port = environment.port || 3000;

connectToDatabase();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScriptd Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});