import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { environment } from './config/environment';
import connectToDatabase from "./config/database";
import cors from 'cors';
import routes from './routes/index'
dotenv.config();

const app: Express = express();
const port = environment.port || 3000;
app.use(express.json());

app.use(cors({
  // origin: '*',
  origin: ['https://song-rosy.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
connectToDatabase();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScriptd Server");
});
app.use('/api', routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});