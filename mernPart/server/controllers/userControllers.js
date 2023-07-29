import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";


const authUser = asyncHandler(async (req, res) => {
  const { number } = req.body;

  const user = await User.findOne({ number });
  if(user){
    generateToken(res, user._id);
    res.status(201).json({
      _id:user._id,
      name:user.name,
      number:user.number
    });
  }else{
    res.status(401);
    throw new Error('Invalid number')
  }

});


const registerUser = asyncHandler(async (req, res) => {
  const {name, number} = req.body;
  
  const userExists= await User.findOne({number});
  if(userExists){
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    number
  });
  if(user){
    generateToken(res, user._id);
    res.status(201).json({
      _id:user._id,
      name:user.name,
      number:number.name
    });
  }else{
    res.status(400);
    throw new Error('Invalid user data')
  }
  });

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '',{
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({message:"User Logged out"});
  });





export { authUser, registerUser , logoutUser};
