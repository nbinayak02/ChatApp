import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { validateToken } from "./middlewares/validation";
import authRouter from "./routes/auth";
import chatRouter from "./routes/chat";
import userRouter from "./routes/user";

dotenv.config();

const app = express();
const port = process.env.PORT;
const frontendUrl = process.env.FRONTEND_ORIGIN;

const corsOptions = {
  origin: frontendUrl,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", validateToken, userRouter);
app.use("/api/chat", validateToken, chatRouter);

mongoose
  .connect("mongodb://localhost:27017/chatapp2")
  .then(() => console.log("Connected to mongodb"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log(`Server started at port ${port}`));
