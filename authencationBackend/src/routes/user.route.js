const Router = require('express')

const router = Router()
const{registerUser} = require("../controller/user.controller")
router.route("/register").post(registerUser)

module.exports =router