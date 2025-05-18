const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

// /user/list
router.get("/list", async (req, res) => {
    try {
        const users = await User.find({}).select("_id last_name");
        res.json(users);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// /user/:id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({_id:id});
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;
