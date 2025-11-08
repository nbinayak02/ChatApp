import { Router } from "express";
import { handleDeleteUser, handleGetAllUsers } from "../controllers/user";
import { handleGetTotalChats } from "../controllers/chat";
const router = Router();

router.get("/totalChats", handleGetTotalChats);
router.get("/allUsers", handleGetAllUsers);
router.delete("/deleteUser/:id", handleDeleteUser);

export default router;
