import { asyncHandler } from "../utils/asyncHandler.js";
import { Users } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const saltRounds = 10;

const secretKey = "Meowmeow";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  
  
  const existingUsersCount = await Users.count();
  

  const role = existingUsersCount === 0 ? 'admin' : 'user';
  
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await Users.create({
    email: email,
    password: hashedPassword,
    username: username.toLowerCase(),
    role: role, 
  });

  if (!newUser) {
    throw new ApiError(500, "User registration failed");
  }

  res.status(201).json({ message: "User registered successfully" });
});

const loginUser = asyncHandler(async (req, res) => {
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

const tokenChecked = asyncHandler(async (req, res) => {
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
