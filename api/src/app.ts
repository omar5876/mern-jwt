import express from "express";
import routes from './routes/index'
import morgan from "morgan";

export const app = express();

app.use(morgan('dev'))
app.use(express.json())

app.use('/', routes)