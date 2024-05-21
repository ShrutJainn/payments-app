import express from "express";
import zod from "zod";
import { Account, User } from "../db.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware.js";

const jwtSecret = process.env.JWT_SECRET;
const userRouter = express.Router();

const signupSchema = zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

userRouter.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) return res.status(411).json({ msg: "Incorrect inputs" });

  const username = req.body.username;
  const user = await User.findOne({ username });
  if (user) return res.status(411).json({ msg: "User already exists" });
  const newUser = req.body;
  const dbUser = await User.create(newUser);

  await Account.create({
    userId: dbUser._id,
    balance: 1 + Math.random() * 10000,
  });
  const token = jwt.sign({ userId: dbUser._id }, jwtSecret);
  res.status(200).json({ msg: "User created successfully", token });
});

userRouter.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);
  if (!success) return res.status(411).json({ msg: "Invalid inputs" });
  const user = await User.findOne({ username: body.username });
  if (!user) return res.status(411).json({ msg: "User does not exists" });

  const password = body.password;
  if (password !== user.password)
    return res.status(411).json({ msg: "Invalid password" });

  const token = jwt.sign({ userId: user._id }, jwtSecret);

  res.status(200).json({ token });
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const userId = req.userId;
  const { success } = updateSchema.safeParse(body);
  if (!success)
    return res.status(411).json({ msg: "Error while updating information" });

  await User.findOneAndUpdate({ _id: req.userId }, req.body);

  return res.status(200).json({ msg: "Profile updated successfully" });
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

export default userRouter;
