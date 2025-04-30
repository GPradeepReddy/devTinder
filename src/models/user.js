const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Name must be required"],
      minLength: 4,
      maxLength: 24,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password minimum 6 charecters"],
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Week password " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
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
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL " + value);
        }
      },
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
