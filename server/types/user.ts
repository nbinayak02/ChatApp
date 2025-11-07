import { Types } from "mongoose";

export type TokenUser = {
  id: Types.ObjectId;
  email: string;
  name: string;
  iat?: number;
};
