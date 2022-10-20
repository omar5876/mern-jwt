import express from "express";
import routes from './routes/index'
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';

export const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))

app.use('/', routes)