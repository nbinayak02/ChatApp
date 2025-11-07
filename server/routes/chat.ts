import { Router } from "express";
import { getLastMessages } from "../controllers/chat";
import { validateToken } from "../middlewares/validation";
const router = Router();

router.get("/recentMessages",validateToken, getLastMessages);

export default router;
