import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createTokenAndSaveCookie = (user, res) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("JWT Secret Key is missing");
    }

    const tokenData = {
      userId: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      httpOnly: true, // XSS protection
      secure: process.env.NODE_ENV === "production", // Use secure cookies only in production
      sameSite: "strict", // CSRF protection
    });

    return token;
  } catch (error) {
    console.error("Error generating JWT:", error.message);
  }
};

export default createTokenAndSaveCookie;
