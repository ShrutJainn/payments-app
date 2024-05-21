import express from "express";
import { authMiddleware } from "../middleware.js";
import { Account } from "../db.js";
import mongoose, { mongo } from "mongoose";

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  res.status(200).json({ balance: account.balance });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { to: toAccountId, amount } = req.body;
  //   const toAccountId = new ObjectId(to);
  const account = await Account.findOne({ userId: req.userId });
  if (account.balance < amount) {
    await session.abortTransaction();
    return res.status(411).json({ msg: "Insufficent balance" });
  }

  const toAccount = await Account.findOne({
    userId: toAccountId,
  });
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(411).json({ msg: "Invalid account" });
  }

  await Account.findOneAndUpdate(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.findOneAndUpdate(
    { userId: toAccountId },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();

  return res.status(200).json({ msg: "Transfer successful" });
});

export default accountRouter;
