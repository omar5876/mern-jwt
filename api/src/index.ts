import { app } from "./app";
import dotenv from 'dotenv';
import mongoose from "mongoose";


dotenv.config();
const {PORT} = process.env;

mongoose.connect("mongodb+srv://admin:admin@cluster0.ueb2c7i.mongodb.net/?retryWrites=true&w=majority")
.then(res => {
    console.log("DB is working");
    app.listen(PORT || 3333, () => {
        console.log("server running on port", PORT || 3333);
    })
})
.catch(err => console.log(err))
