import { Request, Response, NextFunction } from "express";
import { Error } from "../types/auth";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { ExtendedError, Socket } from "socket.io";
import User from "../models/user";
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

export function validateSessionCookie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) return res.status(500).json({ error: "Token not found!" });

  jwt.verify(
    token,
    secret,
    (
      err: JsonWebTokenError | null,
      decoded: JwtPayload | string | undefined
    ) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      } else {
        (req as any).user = decoded;
      }
      next();
    }
  );
}

export function validateSocket(
  socket: Socket,
  next: (err?: ExtendedError) => void
) {
  const token = socket.handshake.auth.token;

  if (!token) {
    const error = new Error("Token not found in Socket Connection");
    next(error);
  }

  jwt.verify(
    token,
    secret,
    (
      err: JsonWebTokenError | null,
      decoded: JwtPayload | string | undefined
    ) => {
      if (err) {
        const error = new Error(
          "Invalid token received from Socket Connection"
        );
        next(error);
      } else {
        (socket as any).user = decoded;
        next();
      }
    }
  );
}

export async function authorizeAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = (req as any).user;

    if (!user) return res.status(422).json({ error: "User not validated." });

    const userRole = await User.findById(user.id).select("role");

    if (!userRole) return res.status(500).json({ error: "User role  not set" });

    if (userRole.role === "user") {
      return res.status(403).json({ error: "Unauthorized account." });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
