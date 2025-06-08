import User from "../models/user.model.js";

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

    const newUser = new User({
      first_name,
      last_name,
      email,
      phone,
      password,
      gender,
      profile_type
    })
    await newUser.save()

    return res.status(200).json({success:true, message:"user created successfully.", data:newUser})
  }catch(error){
    next(error)
  }
};

export const loginUser = async(req, res, next) => {
  try{
    const {} = req.body
  }catch(error){
    next(error)
  }
}