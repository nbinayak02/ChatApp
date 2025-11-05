import { Request, Response, NextFunction } from "express";
import { Error } from "../types/auth";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET || "$ec@et$";

export function validateSignup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, username, password } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const errors: Error = {};

  if (!email) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format.";
  }

  if (!username) {
    errors.username = "Username is required";
  } else if (username.length < 3) {
    errors.username = "Username should be of at least 3 characters.";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password should be of at least 6 characters.";
  }

  if (Object.entries(errors).length > 0) {
    return res.status(422).json({ error: errors });
  }

  next();
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const errors: Error = {};

  if (!email) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format.";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password should be of at least 6 characters.";
  }

  if (Object.entries(errors).length > 0) {
    return res.status(422).json({ error: errors });
  }

  next();
}

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(400).json({ message: "Authorization header not found" });

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(400).json({ message: "No token found" });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    } else {
      (req as any).user = decoded;
    }
    next();
  });
}
