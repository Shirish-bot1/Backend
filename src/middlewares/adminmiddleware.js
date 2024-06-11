import { asyncHandler } from "../utils/asyncHandler.js";
import { Users } from "../models/users.models.js";






const adminMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("email:", email, "password:", password);

    const user = await Users.findOne({
      where: { email: email, password: password },
    });
    console.log("isAdmin:",user.isAdmin)

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    

    const id = user.id;
    console.log(id);

    jwt.sign({ id }, secretKey, { expiresIn: "400s" }, (err, token) => {
      if (err) {
        console.error("Error generating token:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Login Successful", token });
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export { adminMiddleware };
