import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan'
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config();

const app = express();

//middlewares
app.use(express.json()); //For sending and accepting json files.
//cors issue
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
//adding cookie-parser middleware
//Provide COOKIE_SECRET
app.use(cookieParser(process.env.COOKIE_SECRET))

//remove it in the production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;