import { Router } from "express";
import { handleGetUser, handleGetUserDetails, handlePatchUsername } from "../controllers/user";
const router = Router();

router.get("/", handleGetUser);

router.get("/details", handleGetUserDetails);
router.patch("/username/:id", handlePatchUsername);

export default router;
