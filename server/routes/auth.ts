import { Router } from "express";
import {
  handleAdminLogin,
  handleLogin,
  handleSignup,
} from "../controllers/auth";
import { validateLogin, validateSignup } from "../middlewares/validation";
const router = Router();

router.post("/signup", validateSignup, handleSignup);
router.post("/login", validateLogin, handleLogin);
router.post("/admin/login", validateLogin, handleAdminLogin);

export default router;
