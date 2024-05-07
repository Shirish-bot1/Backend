<<<<<<< HEAD
import { asyncHandler } from "../utils/asyncHandler.js";
=======
import { asynchandler } from "../utils/asynchandler.js";
>>>>>>> d72ae087c06d951df90d36590d6aa829bd7237c6
import { Users } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const secretKey = "dasdas";
<<<<<<< HEAD

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  console.log("Received request body:", req.body);

  if (![email, username, password].every((field) => field && field.trim() !== "")) {
=======

const registerUser = asynchandler(async (req, res) => {
  const { email, username, password } = req.body;
  console.log("Received request body:", req.body);

  if (
    ![email, username, password].every((field) => field && field.trim() !== "")
  ) {
>>>>>>> d72ae087c06d951df90d36590d6aa829bd7237c6
    console.log("Missing required fields:", email, username, password);
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await Users.findOne({ where: { email: email } });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const newUser = await Users.create({
    email: email,
    password: password,
    username: username.toLowerCase(),
  });

  if (!newUser) {
    throw new ApiError(500, "User registration failed");
  }

  res.status(201).json({ message: "User registered successfully" });
});

<<<<<<< HEAD
const loginUser = asyncHandler(async (req, res) => {
=======

const loginUser = asynchandler(async (req, res) => {
>>>>>>> d72ae087c06d951df90d36590d6aa829bd7237c6
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email, password } });

  if (!user || user.email !== email || user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  jwt.sign({ user }, secretKey, { expiresIn: "400s" }, (err, token) => {
    if (err) {
      console.error("Error generating token:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "Login Successful", token, isAdmin: user.isAdmin });
  });
});

<<<<<<< HEAD
const tokenChecked = asyncHandler(async (req, res) => {
=======

const tokenChecked = asynchandler(async (req, res) => {
>>>>>>> d72ae087c06d951df90d36590d6aa829bd7237c6
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    const decoded = jwt.verify(token, secretKey);
    res.status(200).json({ user: decoded });
  } catch (err) {
    console.error("Error decoding token:", err);
    res.status(500).json({ message: "Error decoding token" });
  }
});

export { registerUser, loginUser, tokenChecked };
