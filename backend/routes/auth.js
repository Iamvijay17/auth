import express from "express";
import { signin, signup, verify } from "../controller/auth.js";
import { signup_mail } from "../controller/mail.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signup-mail", signup_mail);
router.post("/verify/:token", verify);


export default router;