const {mongoose,Schema} = require("mongoose")
const bcrypt = require("bcrypt")
const ApiError = require("../utils/apiError")
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
userSchema.methods.isPasswordCorrect = async function(password){

    return await bcrypt.compare(password,this.password);
}
const User = mongoose.model("User",userSchema)

module.exports = User