import { Users } from "../../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const secretKey = "Meowmeow";
const registerUser = asynchandler(async (req, res) => {
  const { email, username, password } = req.body;
  console.log("emial", email);

  if (
    ![email, username, password].every((field) => field && field.trim() !== "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if the user already exists
  const existingUser = await Users.findOne({ where: { email: email } });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // Create the user
  const newUser = await Users.create({
    email: email,
    password: password,
    username: username.toLowerCase(),
  });

  if (!newUser) {
    throw new ApiError(500, "User registration failed");
  }

  // User registration successful
  return res.status(201).json({ message: "User registered successfully" });
});

const loginUser = asynchandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("emai", email);

    const user = await Users.findOne({ where: { email, password } });

    if (user.email == email && user.password == password) {
      jwt.sign({ user }, secretKey, { expiresIn: "400s" }, (err, token) => {
        if (err) {
          console.error("Error generating token:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res
          .status(200)
          .json({ message: "login Successful", token, isAdmin: user.isAdmin });
      });
    } else {
      return res.json("unvalid user or password");
    }
  } catch (error) {
    res.status(500).json("somenthing went wrong");
  }
});
const usersDetail = asynchandler(async (req, res) => {
  try {
    const allUsers = await Users.findAll();

    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.error("Error occurred while retrieving users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteUser = asynchandler(async (req, res) => {
  const userID = req.params.id;
  console.log("id", userID);

  try {
    const users = await Users.destroy({
      where: {
        id: userID,
      },
    });
    console.log("users");

    res.status(200).json({ message: "Userdeleted Successful" });
  } catch (err) {
    res.send("error");
  }
});

const tokenChecked = asynchandler(async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(500).json({ message: "sorry to find a token" });
    }
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;
    console.log(userId);

    res.status(200).json({ user: decoded });
  } catch (err) {
    console.log(err);
  }
});
const secretKey2 = "dasdas";
const loginAdmin = asynchandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email:", email, "password:", password);

    const user = await Users.findOne({
      where: { email: email, password: password },
    });
    console.log("isadin:", user.isAdmin);

    if (!user.isAdmin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const id = user.id;
    console.log(id);

    if (user.isAdmin == true) {
      jwt.sign({ id }, secretKey2, { expiresIn: "400s" }, (err, token) => {
        if (err) {
          console.error("Error generating token:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res
          .status(200)
          .json({ message: "Login Successful", token, isAdmin: user.isAdmin });
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export { registerUser, loginUser,tokenChecked,deleteUser,usersDetail,loginAdmin};