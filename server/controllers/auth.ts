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

    await User.create({
      email,
      username,
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: "user" });

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

export async function createDefaultAdmin() {
  try {
    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@chatapp.com";
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "admin123";

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const adminExist = await User.findOne({
      email: defaultEmail,
      role: "admin",
    });

    if (adminExist) return 500;

    await User.create({
      username: "Admin",
      email: defaultEmail,
      password: hashedPassword,
      role: "admin",
    });

    return 201;
  } catch (error) {
    console.log(error);
  }
}

export async function handleAdminLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: "admin" });

    if (!user) {
      //try to create default admin
      const statusCode = await createDefaultAdmin();

      // return if default admin already created
      if (statusCode === 500) {
        return res.status(500).json({ error: "Invalid username" });
      }

      return res.status(201).json({
        error: "Default admin created. Use credentials of default admin.",
      });
    }

    // compare password if admin exists
    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return res.status(500).json({ error: "Wrong password" });
    }

    const token = createToken(user);

    return res
      .status(200)
      .cookie("token", token) //session cookie - expires after session ends
      .json({ message: "Login Successful" });
  } catch (error) {
    console.log(error);
  }
}
