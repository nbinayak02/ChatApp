import { Router } from "express";
import { getLastMessages } from "../controllers/chat";

const router = Router();

router.get("/recentMessages", getLastMessages);

export default router;
