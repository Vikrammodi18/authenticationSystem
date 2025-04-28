require('dotenv').config()
const mongoose = require("mongoose")

const DB_NAME = require("../constant")

const connectDB = async()=>{
    try {
        
        
        const connect = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("connection is successful,DB_HOST:",connect.connection.host)
    } catch (error) {
        console.error("error: mongoDB connection failed",error)
        process.exit(1)
    }
}

module.exports = connectDB