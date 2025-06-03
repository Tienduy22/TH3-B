const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller")


router.get("/list", controller.getAll);

router.post("/admin/register", controller.register)

router.post("/admin/login", controller.login)

router.post("/admin/logout", controller.logout)

router.get("/detail/:id", controller.detail)

router.get("/check-auth", controller.checkAuth)

module.exports = router;
