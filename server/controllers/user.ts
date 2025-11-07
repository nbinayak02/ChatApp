import { Request, Response } from "express";
import User from "../models/user";
export function handleGetUser(req: Request, res: Response) {
  const { user } = req as any;
  return res.status(200).json({ data: { id: user.id, name: user.name } });
}

export async function handleGetUserDetails(req: Request, res: Response) {
  try {
    const { user } = req as any;
    const userDetails = await User.findOne({ _id: user.id });
    if (!userDetails) {
      return res.status(500).json({ error: "User not found." });
    }
    return res
      .status(200)
      .json({ message: "User details fetched.", data: userDetails });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
