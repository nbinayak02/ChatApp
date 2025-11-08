import { Router } from "express";
import {
  handleDeleteUser,
  handleGetUser,
  handleGetUserDetails,
  handlePatchUsername,
} from "../controllers/user";
const router = Router();

router.get("/", handleGetUser);

router.get("/details", handleGetUserDetails);
router.patch("/username/:id", handlePatchUsername);
router.delete("/:id", handleDeleteUser);

export default router;
