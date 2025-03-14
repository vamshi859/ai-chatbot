import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-management.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        //get all users
        const users = await User.find();
        return res.status(200).json({
            message: "OK", users
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        //user signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).json({ message: "User already registered" });
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        //create token and store cookie
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true //again encrypt the cookie
        });
        return res.status(201).json({
            message: "OK", name: user.name, email: user.email
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        //user signup
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
            return res.status(403).json({
                message: "Invalid credentials"
            });
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true //again encrypt the cookie
        });
        return res.status(200).json({
            message: "OK", name: user.name, email: user.email
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        //user signup
        const user = await User.findById(res.locals.jwtData.id);
        //  console.log(res.locals);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({
                message: "Permissions denied"
            });
        }
        return res.status(200).json({
            message: "OK", name: user.name, email: user.email
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        });
    }
};
//# sourceMappingURL=user-controller.js.map