const Photo = require("../models/photoModel");
const User = require("../models/userModel");

//[GET] /photosOfUser/all
module.exports.getAll = async (req, res) => {
    try {
        const photos = await Photo.find();
        res.status(200).json({
            photos,
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

//[GET] /photosOfUser/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    try {
        const photos = await Photo.find({ user_id: id });
        const user = await User.findOne({ _id: id }).select("_id last_name");
        for (const photo of photos) {
            for (const comment of photo.comments) {
                const userName = await User.findOne({
                    _id: comment.user_id,
                }).select("last_name");
                if (userName) {
                    comment.userName = userName.last_name; 
                }
            }
        }
        if (!user) {
            res.status(400).json({
                message: "id không hợp lệ",
            });
        }
        res.status(200).json({
            photos,
            user,
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

//[POST] /photosOfUser/commentsOfPhoto/:photo_id
module.exports.commentPost = async (req, res) => {
    try {
        const { comment, user_id } = req.body;
        const photo_id = req.params.photo_id;

        const newComment = {
            comment: comment,
            date_time: new Date(),
            user_id: user_id,
        };

        const photo = await Photo.updateOne(
            { _id: photo_id },
            { $push: { comments: newComment } }
        );

        res.status(200).json({
            message: "Tạo comment thành công",
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
//[POST] /photosOfUser/addPhoto/:user_id
module.exports.addPhoto = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const file_name = req.body.file_name;
        console.log(file_name);

        const photo = new Photo({
            file_name: file_name,
            date_time: new Date(),
            user_id: user_id,
            comments: [],
        });

        await photo.save();

        res.status(200).json({
            message: "Upload photo success",
            photo,
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
