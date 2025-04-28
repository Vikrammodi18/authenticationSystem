const User = require("../model/user.model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse")

const registerUser  = asyncHandler(async(req,res)=>{

    const {username,email,password} = req.body;
    
    if([username,email,password].some((val)=> !val || val.trim()==="")){
        throw new ApiError(400,"username,email or password are required!")
    }
    const existedUser = await User.findOne({email})
    if(existedUser){
        return res
        .status(409)
        .json(
            new ApiResponse(409,existedUser,"user already existed")
        )
    }else{
        try {
            const user = new User({
                username,
                password,
                email
            })
           
           const saveUser = await user.save();
           if(!saveUser){
            throw new ApiError(500,"unable to registe user")
           }
            return res
            .status(200)
            .json(
                new ApiResponse(200,saveUser,"user registered")
            )
        } catch (error) {
            console.log(error)
            throw new ApiError(500,error||"something went wrong while register user")
        }
    }
})
const loginUser = asyncHandler(async (req,res)=>{
    let {email,password} = req.body
    if([email,password].some((field)=> !field || field.trim()==="")){
        throw new ApiError(400,"email or password are required")
    }
    email = email.trim()
    password = password.trim()
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(404,"user is not registered!")
    }
    
    const checkPassword = await user.isPasswordCorrect(password)
    
    if(!checkPassword){
        return res
        .status(403)
        .json(
            new ApiResponse(403,"","password is wrong")
        )
    }else{
        return res
        .status(200)
        .json(
            new ApiResponse(200,user,"you are logged in")
        )
    }
})
module.exports = {
    registerUser,
    loginUser
}