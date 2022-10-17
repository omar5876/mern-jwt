import {  NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const {SECRET_KEY} = process.env;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers['authorization']
    const token = headers?.split(" ")[1];


    if(!token) return res.status(404).json({message: 'There is no token'})

    jwt.verify(token, SECRET_KEY as string, (err, user) => {
        if(err) return res.status(400).json({message: 'invalid token'});
        res.locals.user = user;
        next();
  
    })
}