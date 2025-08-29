import Nominee from "../models/nominee.model.js";
import { objSanitizeflatten } from "../utils/updateObjSanitise.js";

/** ##################################################################################################################### */
/** Create New Nominee */
export const createNominee = async(req, res, next) => {
  try{
    const {full_name, political_party, constituency, experience, manifesto} = req.body
    if(!full_name || !political_party || !constituency || !experience || !manifesto ){
      return res.status(400).json({success:false,
        message:"Required valid fields 'full_name, political_party, constituency, experience, manifesto'."})
    };

    const recordExist = await Nominee.findOne({full_name})
    if(recordExist){
      return res.status(400).json({success:false, message:"Nominee Already Exist."})
    };

    const newNominee = new Nominee({
      full_name,
      political_party,
      constituency,
      experience,
      manifesto
    })
    await newNominee.save()
    return res.status(200).json({success:true, message:"Nominee Created Successfully.", data:newNominee})
  }catch(error){
    next(error)
  }
};

/** ##################################################################################################################### */
/** Update Nominee Details */
export const updateNominee = async(req, res, next) =>{
  try{
    const {id} = req.body
    console.log("Update object: ", req.body)
    if(!id){
      return res.status(400).json({success:false, message:"Required valid 'id'."})
    };

    const recordCheck = await Nominee.findById(id)
    if(!recordCheck){
      return res.status(404).json({success:false, message:"Nominee Record Not Found."})
    };

    const updObjSanRes = objSanitizeflatten(req.body)
    console.log("Update Object: ", updObjSanRes)
    const updateRecord = await Nominee.findByIdAndUpdate(id,
      {$set:{...updObjSanRes}}, {new:true, runValidators:true})

    return res.status(200).json({success:true, message:"Nominee Record Updated Successfully.", data:updateRecord})
  }catch(error){
    next(error)
  }
};

/** ##################################################################################################################### */
/** Delete Existing Nominee */
export const deleteNominee = async(req, res, next) => {
  try{
    const {id} = req.query
    if(!id){
      return res.status(400).json({success:false, message:"Required valid 'id'."})
    };

    const deleteRecord = await Nominee.findByIdAndDelete(id)

    if(!deleteRecord){
      return res.status(404).json({success:false, message:"Record Not Found."})
    };

    return res.status(200).json({success:false, message:"Nominee Record Deleted Successfully.", data:deleteRecord})
  }catch(error){
    next(error)
  }
};