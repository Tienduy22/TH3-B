const User = require("../models/userModel");
const JWTHepler = require("../../helpers/jwt.helper");
const jwt = require("jsonwebtoken");

//[GET] /user/list
module.exports.getAll = async (req, res) => {
    try {
        const users = await User.find({}).select("_id last_name");
        res.json(users);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

//[GET] /user/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

//[POST] /user/register
module.exports.register = async (req, res) => {
    try {
        const checkEmail = await User.findOne({
            login_name: req.body.login_name,
        });

        if (checkEmail) {
            res.status(400).json({
                message: "Email already exists",
            });
        } else {
            const user = new User(req.body);
            await user.save();

            user.token = await JWTHepler.accessToken({
                _id: user._id,
            });

            await user.save();

            res.cookie("token", user.token, {
                HttpOnly: true,
                Secure: false,
                SameSite: "None", // Cần thiết khi gửi cookie cross-origin
                maxAge: 3600000,
            });

            res.status(200).json({
                message: "Register success",
                status: 200,
            });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

//[POST] /user/login
module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            login_name: req.body.login_name,
            password: req.body.password,
        });

        if (!user) {
            res.status(400).json({
                message: "Incorrect account or password",
            });
        } else {
            user.token = await JWTHepler.accessToken({
                id: user._id,
            });
            res.cookie("token", user.token, {
                HttpOnly: true,
                Secure: false,
                SameSite: "None",
                maxAge: 3600000,
            });
            res.status(200).json({
                message: "Login success",
                status: 200,
                user: user,
            });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

//[POST] /user/logout
module.exports.logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            message: "Logout success",
        });
    } catch (error) {
        res.status(500).send({ error: err.message });
    }
};

//[GET] /user/check-auth
module.exports.checkAuth = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    const trimmedToken = token.trim();

    try {
        const decoded = jwt.verify(trimmedToken, process.env.JWT_SECRET);
        res.status(200).json({ message: "Authenticated", user: decoded });
    } catch (err) {
        console.error("JWT verify error:", err);
        res.status(401).json({ message: "Invalid token" });
    }
};
