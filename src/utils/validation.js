const validator = require("validator");
const { emit } = require("../models/user");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowEditFields = [
    "firstName",
    "lastName",
    "email",
    "about",
    "age",
    "skills",
    "gender",
    "photoUrl",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = {
  validateSignupData,
  validateEditProfileData
};
