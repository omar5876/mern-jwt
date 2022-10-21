import {  NextFunction, Request, Response } from "express";
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserToken } from "../middlewares/auth";
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

    if(req.cookies[`${userFound._id}`]){
        req.cookies[`${userFound._id}`]
    }

    res.cookie(String(userFound._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60),
        httpOnly: true,
        sameSite: "lax"

    });
    return res.status(201).json({message: 'Successfully logged in', user: userFound, token});
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user.id;
    let userFound;

    try {
        userFound = await User.findById(userId, "-password");
    } catch (error) {
        console.log(error);
    }

    if (!userFound) return res.status(404).json({message: 'User not found'})

    res.status(201).json({user: userFound});
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.headers.cookie;
    const prevToken = cookie?.split("=").pop();
  
    if (!prevToken)
      return res.status(404).json({ message: "Couldn't find the token" });
  
    jwt.verify(prevToken, SECRET_KEY as string, (err, user: UserToken | any) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Athentication has failed" });
      }
  
      res.clearCookie(`${user?.id}`);
      req.cookies[`${user?.id}`] = "";
  
      return res.status(200).json({message: 'Successfully Logged out'})
    });
}