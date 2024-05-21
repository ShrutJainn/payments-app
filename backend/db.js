import mongoose, { mongo } from "mongoose";

mongoose
  .connect(
    "mongodb+srv://shrutjain488:0kJcgFvw6KIKwA5b@cluster0.0aft6ei.mongodb.net/paytmDb"
  )
  .then(() => console.log("Successfully connected to the database"));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

export const User = mongoose.model("User", userSchema);

const accountsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

export const Account = mongoose.model("Account", accountsSchema);
