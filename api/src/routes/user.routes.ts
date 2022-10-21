import { Router} from "express";
import { getUser, login, logout, signUp } from "../controllers/user.controllers";
import { refreshToken, verifyToken } from "../middlewares/auth";

const router = Router();

router.post('/signup', signUp)
router.post('/login', login)
router.get('/users', verifyToken, getUser)
router.get('/refresh', refreshToken, verifyToken, getUser)
router.get('/logout', logout)


export default router;