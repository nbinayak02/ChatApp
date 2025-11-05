import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token";

export async function handleSignup(req: Request, res: Response) {
  try {
    const { email, username, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(500).json({ error: "User already exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, username, password: hashedPassword });

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return res.status(500).json({ error: "Wrong password" });
    }

    const token = createToken(user);

    return res
      .status(200)
      .json({ message: "Login Successful", data: { token } });
  } catch (error) {
    console.log(error);
  }
}
