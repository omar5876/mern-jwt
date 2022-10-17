import { Router, Request, Response } from "express";
import { getUser, login, signUp } from "../controllers/user.controllers";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.post('/signup', signUp)
router.post('/login', login)
router.get('/users', verifyToken, getUser)


export default router;