import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_KEY } = process.env;

export interface UserToken {
  id: string;
  iat: number;
  exp: number;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.headers.cookie;
  const token = cookie?.split("=").pop();
  /*     const headers = req.headers['authorization']
    const token = headers?.split(" ")[1]; */
  console.log("Token =", token);
  if (!token) return res.status(404).json({ message: "There is no token" });

  jwt.verify(token, SECRET_KEY as string, (err, user: UserToken | any) => {
    if (err) return res.status(400).json({ message: "invalid token" });
    res.locals.user = user.id;
    next();
  });
};

export const refreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    const token = jwt.sign({ id: user.id }, SECRET_KEY as string, {
      expiresIn: "1hr",
    });

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60),
      httpOnly: true,
      sameSite: "lax",
    });

    res.locals.user = user.id;
    next();
  });
};
