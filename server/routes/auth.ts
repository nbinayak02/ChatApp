import { Router } from "express";
import { handleLogin, handleSignup } from "../controllers/auth";
import { validateLogin, validateSignup } from "../middlewares/validation";
const router = Router();

router.post("/signup", validateSignup, handleSignup);
router.post("/login", validateLogin, handleLogin);

export default router;
