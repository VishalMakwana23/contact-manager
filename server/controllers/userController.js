const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const router = require("../routes/userRoutes");
const User = require("../models/userModal");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route Get /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  // Hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      data: {
        _id: user.id,
        email: user.email,
        message: "User registered successfully",
      },
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid !");
  }
});

//@desc Login user
//@route Get /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const user = await User.findOne({ email });

  //compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );
    res
      .status(200)
      .json({ data: { accessToken, message: "User login successfully" } });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
  res.json({ message: "Login the user" });
});

//@desc Get current user information
//@route Get /api/users/register
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
