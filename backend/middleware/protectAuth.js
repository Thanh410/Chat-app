import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const protectAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provider" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provider" });
    }

    const user = await UserModel.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectAuth;
