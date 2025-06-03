const express = require("express");
const router = express.Router();
const controller = require("../controllers/photo.controller")
const multer = require("multer");
const path = require("path");



router.get("/list", controller.getAll); 

router.get("/:id", controller.detail); 

router.post("/commentsOfPhoto/:photo_id", controller.commentPost)

router.post("/addPhoto/:user_id", controller.addPhoto);


module.exports = router;
