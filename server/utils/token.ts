import jwt from "jsonwebtoken";
import { User } from "../types/auth";

const secret = process.env.JWT_SECRET || "$ec@et$";

export function createToken(user: User) {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.username,
  };

  const token = jwt.sign(payload, secret);

  return token;
}


