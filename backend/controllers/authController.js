import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createTokenAndSaveCookie from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const { fullName, email,password,preferences} = req.body;
         
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            preferences
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
            newUser
        });
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };

        const token = createTokenAndSaveCookie(user,res)

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        }

        return res.status(200).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}