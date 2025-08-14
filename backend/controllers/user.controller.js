import User from "../models/user.model.js";

export const updateUser = async(req, res, next) => {
  try{
    const {id} = req.body
    if(!id){
      return res.status(400).json({success:false, message:"Required valid field 'id'."})
    };

    const updateUserRecord = await User.findByIdAndUpdate(id, {
      $set:{...req.body}}, {new:true, runValidators:true})
    if(!updateUserRecord){
      return res.status(404).json({success:false, message:"User Record Not Found."})
    };

    return res.status(200).json({success:true, message:"User Record Updated Successfully.", data:updateUserRecord})
  }catch(error){
    next(error)
  }
};


export const deleteUser = async(req, res, next) => {
  try{
    const {id} = req.query
    if(!id){
      return res.status(400).json({success:false, message:"Required valid field 'id'."})
    };

    const userRecord = await User.findById(id)
    if(!userRecord){
      return res.status(404).json({success:false, message:"User Record Not Found."})
    };

    const deleteUserRecord = await User.findByIdAndUpdate(id, {
      $set:{email:`d+${userRecord.email}`, phone:`d+${userRecord.phone}`}}, {new:true, runValidators:true})

    return res.status(200).json({success:true, message:"User Record Deleted Successfully.", data:deleteUserRecord})
  }catch(error){
    next(error)
  }
};