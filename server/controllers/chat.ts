import { Request, Response } from "express";
import Message from "../models/message";
import { ExtendedError, Socket } from "socket.io";
import ActiveNow from "../models/activeNow";
import { User } from "../types/auth";
import { TokenUser } from "../types/user";

export async function getLastMessages(req: Request, res: Response) {
  try {
    const last20Msg = await Message.find({})
      .populate("userId", "userId username")
      .sort({ createdAt: -1 })
      .limit(20);
    return res
      .status(200)
      .json({ message: "Fetched last 20 messages!", data: last20Msg });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

export async function incrementCurrentlyActive(
  socket: Socket,
  next: (err?: ExtendedError) => void
) {
  console.log("Incrementing currently active");
  try {
    const activeNow = await ActiveNow.findOneAndUpdate(
      { room: "defaultGroup" }, //find defaultGroup
      { $inc: { currentlyActive: 1 } }, //increment by 1
      { upsert: true, new: true } //upsert -> if not then create new document. new -> return updated data
    );

    if (activeNow) {
      (socket as any).currentlyActive = activeNow.currentlyActive;
      console.log("Currently active is: ", activeNow.currentlyActive);
    }
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    next();
  }
}

export async function decrementCurrentlyActive() {
  try {
    const activeNow = await ActiveNow.findOneAndUpdate(
      { room: "defaultGroup" }, //find defaultGroup
      { $inc: { currentlyActive: -1 } }, //decrement by 1
      { upsert: true, new: true } //upsert -> if not then create new document. new -> return updated data
    );

    return activeNow.currentlyActive;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function saveMessage(user: TokenUser, message: string) {
  console.log("Saving message...");
  console.log("User is: ", user);
  try {
    const createdMsg = await Message.create({
      userId: user.id,
      message: message,
    });
    // console.log("Message has been saved: ", createdMsg);
    await createdMsg.populate("userId", "userId username");
    return { createdMsg };
  } catch (error) {
    console.log(error);
  }
}
