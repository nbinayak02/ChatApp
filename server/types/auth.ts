import { Types } from "mongoose";

export type Error = {
  email?: string;
  username?: string;
  password?: string;
};

export type User = {
  _id: Types.ObjectId,
  email: string;
  username: string,
  password: string,
  role: "admin" | "user";
}