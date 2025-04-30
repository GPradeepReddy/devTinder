const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Name must be required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [24, "Name must be max 24 characters"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters"],
      validate: [validator.isStrongPassword, "Password must be stronger"],
    },
    age: {
      type: Number,
      min: [18, "Minimum age is 18"],
      default: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate: [validator.isURL, "Invalid photo URL"],
    },
    about: {
      type: String,
      default: "Default about message",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
