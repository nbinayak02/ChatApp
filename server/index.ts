import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  authorizeAdmin,
  validateSessionCookie,
  validateSocket,
  validateToken,
} from "./middlewares/validation";
import authRouter from "./routes/auth";
import chatRouter from "./routes/chat";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";
import {
  decrementCurrentlyActive,
  incrementCurrentlyActive,
  saveMessage,
} from "./controllers/chat";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT;
const frontendUrl = process.env.FRONTEND_ORIGIN;

const corsOptions = {
  origin: frontendUrl,
  credentials: true,
};

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

io.use(validateSocket);
io.use(incrementCurrentlyActive);

io.on("connection", async (socket) => {
  console.log("Someone connected...");
  //join default group
  await socket.join("defaultGroup");

  //emit active now to group
  io.to("defaultGroup").emit(
    "onlineUsersCount",
    (socket as any).currentlyActive
  );

  //emit new user name to group
  io.to("defaultGroup").emit("newConnection", (socket as any).user.name);

  socket.on("sendMessage", async (message) => {
    console.log("Received message.");
    const savedMessage = await saveMessage((socket as any).user, message);
    io.to("defaultGroup").emit("recentMessage", savedMessage);
  });

  socket.on("getActiveNow", () => {
    io.to("defaultGroup").emit(
      "onlineUsersCount",
      (socket as any).currentlyActive
    );
  });

  socket.on("disconnect", async () => {
    console.log("Disconnecting...");
    const online = await decrementCurrentlyActive();
    io.to("defaultGroup").emit("onlineUsersCount", online);
    socket.leave("defaultGroup");
    io.to("defaultGroup").emit("disconnectedUser", (socket as any).user.name);
  });
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", validateToken, userRouter);
app.use("/api/admin", validateSessionCookie, authorizeAdmin, adminRouter);
app.use("/api/chat", validateToken, chatRouter);

mongoose
  .connect("mongodb://localhost:27017/chatapp2")
  .then(() => console.log("Connected to mongodb"))
  .catch((error) => console.error(error));

httpServer.listen(port, () => console.log(`Server started at port ${port}`));
