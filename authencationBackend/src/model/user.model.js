const {mongoose,Schema} = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    
    
    this.password = await bcrypt.hash(String(this.password), 10);
    
    next()

})

const User = mongoose.model("User",userSchema)

module.exports = User