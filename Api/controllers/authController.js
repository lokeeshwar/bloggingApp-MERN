const userdata = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");

const signup = async (req, res, next) => {
    
  const { username, email, password } = req.body;
  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "all fields are required"));
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new userdata({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("new user data saved");
  } catch (error) {
    next(error);
  }
};

module.exports = { signup };
