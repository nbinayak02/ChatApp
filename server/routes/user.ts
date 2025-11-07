import { Router } from "express";
import { handleGetUser, handleGetUserDetails } from "../controllers/user";
const router = Router();

router.get("/", handleGetUser);

router.get("/details", handleGetUserDetails);

export default router;
