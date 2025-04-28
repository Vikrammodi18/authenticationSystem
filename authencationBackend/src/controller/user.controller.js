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
            const user = await User.create({
                username,
                password,
                email
            })
            if(!user){
                throw new ApiError(501,"something went wrong while register user")
            }
            return res
            .status(200)
            .json(
                new ApiResponse(200,user,"user registered")
            )
        } catch (error) {
            console.log(error)
            throw new ApiError(500,error||"something went wrong while register user")
        }
    }
})

module.exports = {
    registerUser
}