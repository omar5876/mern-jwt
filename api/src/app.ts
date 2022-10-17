import express from "express";
import routes from './routes/index'
import morgan from "morgan";
import cookieParser from "cookie-parser";

export const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())


app.use('/', routes)