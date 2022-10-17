import {Schema, model} from "mongoose";
import { IUser } from "../interfaces/interfaces";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})


export default model("User", userSchema);