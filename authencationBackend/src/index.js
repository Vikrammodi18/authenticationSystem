const app = require("./app.js") 
const connectDB = require("./db/db.config.js")
require('dotenv').config()
const port = process.env.PORT || 8080
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server start at ${port}`)
    })
    app.on("error",(err)=>{
        console.log("your app is not running:",err)
        throw err
    })
})