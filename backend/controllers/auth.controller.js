import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

/** ##################################################################################################################### */
/** Register */
export const registerUser = async(req, res, next) => {
  try{
    const {first_name, last_name, email, phone, password, gender, profile_type}  = req.body

    if(!first_name || !last_name ||  !email || !phone || !gender){
      return res.status(400).json({success:false, message:"required all mandatory fields."})
    };

    const isUserExist = await User.findOne({email})
    if(isUserExist){
      return res.status(400).json({success:false, message:"User already exist with this email."})
    };

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      first_name,
      last_name,
      email,
      phone,
      password:hashPassword,
      gender,
      profile_type
    })
    await newUser.save()

    return res.status(200).json({success:true, message:"user created successfully.", data:newUser})
  }catch(error){
    next(error)
  }
};

/** ##################################################################################################################### */
/** Login */
export const login = async(req, res, next) => {
  try{
    const {email_phone, password} = req.body
    if(!email_phone || !password){
      return res.status(400).json({success:false, message:"Required valid 'email or phone and password'."})
    };

    let userExist = ""
    if(email_phone.includes("@")){
      userExist = await User.findOne({email:email_phone})
    }else{
      userExist = await User.findOne({phone:email_phone})
    };

    if(!userExist){
      return res.status(400).json({success:false, message:"User don't exist, Register Please!"})
    };

    const comparePassword = await bcrypt.compare(password, userExist.password)
    if(!comparePassword){
      return res.status(400).json({success:false, message:"Password in Incorrect."})
    };

    const jwtSecret = process.env.JWT_SECRET
    const {_id, name, email, profile_type} = userExist
    const data = {
      user:{
        user_id:_id,
        name,
        email,
        cookieExist:true,
        user_type:profile_type
      }
    }
    const jwtSign = jwt.sign(data, jwtSecret, {expiresIn:"2hr"})
    res.cookie("JWT_Token", jwtSign, {
      httpOnly:false,
      secure:false,
      sameSite:"lax",
      maxAge:2*60*60*1000,
      path:"/"
    });

    const userData={
      user_id:_id,
      name,
      email
    }
    return res.status(200).json({success:true, message:"User logged successfully", data:userData})
  }catch(error){
    next(error)
  }
};

/** ##################################################################################################################### */
/** Validate Cookies */
export const validateCookie = async(req, res, next) => {
  try{
    const {user} = req
    return res.status(200).json({success:true, message:"Valid Cookies.", data:user})
  }catch(error){
    next(error)
  }
};

/** ##################################################################################################################### */
/** Logout */
export const logout = async(req, res, next) => {
  try{
    res.clearCookie("JWT_Token",
      {
        httpOnly:false,
        secure:false,
        sameSite:"lax",
        path:"/"
      })
    return res.status(200).json({success:false, message:"User Logged-Out successfully."})
  }catch(error){
    next(error)
  }
};