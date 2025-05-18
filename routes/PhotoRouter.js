const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

// /photosOfUser/all
router.get("/photosOfUser/all", async (req, res) => {
    try {
        const photos = await Photo.find();
        res.status(200).json({
            photos
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
   }
}); 

// /photosOfUser/:id

router.get("/photosOfUser/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const photos = await Photo.find({ user_id: id });
        const user = await User.find({_id: id}).select("_id last_name");
        if(!user) {
            res.status(400).json({
                message: "id không hợp lệ"
            })
        }
        res.status(200).json({
            photos,
            user
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
   }
}); 

module.exports = router;
