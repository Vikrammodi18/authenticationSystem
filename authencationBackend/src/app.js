const express = require("express")
const app = express()
const cors = require("cors")


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user.route")
app.use("/api/v1/users",userRouter)

module.exports = app

