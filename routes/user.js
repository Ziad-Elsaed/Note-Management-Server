const express = require("express");
const authRoutes = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    regestValidtion,
    loginValidtion,
} = require("../middleware/userValid");
const checkErrors = require("../middleware/expValidatorResult");

authRoutes.post(
    "/register",
    regestValidtion,
    checkErrors,
    async (req, res, next) => {
        try {
            const { name, email, pass } = req.body;

            // check if there is a user with this data or not
            let check = await User.findOne({ username: name }).exec();
            if (check)
                return res
                    .status(409)
                    .json({
                        success: false,
                        msg: "this username is already taken by other user",
                    });
            check = await User.findOne({ email: email }).exec();
            if (check)
                return res
                    .status(409)
                    .json({
                        success: false,
                        msg: "this email is already taken by other user",
                    });

            const hashedPass = await bcrypt.hash(pass, 10);

            const newUser = await User.create({
                username: name,
                email: email,
                password: hashedPass,
            });

            res
                .status(200)
                .json({ success: true, msg: "Account created successfuly" });
        } catch (err) {
            next(err);
        }
    }
);

authRoutes.post(
    "/login",
    loginValidtion,
    checkErrors,
    async (req, res, next) => {
        try {
            const { email, pass } = req.body;

            const user = await User.findOne({ email });
            if (!user)
                return res
                    .status(401)
                    .json({ success: false, msg: "invalid email or password" });

            const isMatch = await bcrypt.compare(pass, user.password);
            if (!isMatch)
                return res
                    .status(401)
                    .json({ success: false, msg: "invalid email or password" });

            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
                expiresIn: "10h",
            });
            res.status(200).json({ success: true, msg: "Login Done successfuly", token });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = authRoutes;
