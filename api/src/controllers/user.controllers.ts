import {  NextFunction, Request, Response } from "express";
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const {SECRET_KEY} = process.env;


export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<Response> =>  {
    const {name, email, password} = req.body;
    let userFound;
    try {
        userFound = await User.findOne({email});
    } catch (error) {
        console.log(error);
    }
    if(userFound) return res.status(400).json({message: 'Email already exists'})

    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({name, email, password: hashedPassword});
    try {
        await user.save();
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: 'It could not be created'})
    }

    return res.status(201).json({message: user});
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const {email, password} = req.body;
    let userFound;

    try {
        userFound = await User.findOne({email})
    } catch (error) {
        console.log(error)
    }

    if (!userFound) return res.status(400).json({message: 'User not found'})

    const correctPassword = bcrypt.compareSync(password, userFound.password);

    if(!correctPassword) return res.status(400).json({message: 'Wrong Password'})

    const token = jwt.sign({id: userFound._id}, SECRET_KEY as string, {expiresIn: '1hr'})
    return res.status(201).json({message: 'Successfully logged in', user: userFound, token});
}

export const getUser = (req: Request, res: Response, next: NextFunction) => {
    res.send({itPass: res.locals.user})
}