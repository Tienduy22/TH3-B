const photoRoute = require("./PhotoRouter")
const userRoute = require("./UserRouter")

module.exports = (app) => {
    const PATH_API = "/api/"

    app.use(PATH_API + "photosOfUser", photoRoute)

    app.use(PATH_API + "user", userRoute)
} 