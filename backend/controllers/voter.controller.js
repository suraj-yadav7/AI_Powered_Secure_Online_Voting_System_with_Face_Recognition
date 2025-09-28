import { payloadChecker } from "../middleware/payloadChecker.js";
import User from "../models/user.model.js";
import Voter from "../models/voter.model.js";
import { objSanitizeflatten } from "../utils/updateObjSanitise.js";

/** ##################################################################################################################### */
/** Register New Voter */
export const registerVoter = async(req, res, next) =>{
  try{
    const {aadhar_number} = req.body
    console.log("req.body: ", req.body)
    const checkPayload = payloadChecker(req.body)
    if(checkPayload){
      return res.status(400).json({status:false,
        message:`Payload missiong Values: ' ${checkPayload?.missingValuesFields} ' and keys: ' ${checkPayload?.missingKeyFields} '`})
    };

    const  voterExist = await Voter.findOne({aadhar_number})
    if(voterExist){
      return res.status(400).json({success:false, message:"Voter already exist with this aadhar number"})
    };


    const newVoter = new Voter({
      ...req.body
    })
    await newVoter.save()

    await new User.findOneAndUpdate({email:req.body.email}, {
      $set:{voterId:newVoter.id}}, {new:true, runValidators:true})

    return res.status(200).json({success:true, message:"Voter Profile Created Successfully.", data:newVoter})
  }catch(error){
    next(error)
  }
};

export const adminAction = async(req, res, next) => {
  try{
    const {id, actionType} = req.body
    if(!id || !actionType){
      return res.status(400).json({status:false, message:"Required valid field 'id, actionType'."})
    };

    const checkRecord = await Voter.findById(id)
    if(!checkRecord){
      return res.status(404).json({status:false, message:"record not found."})
    }
    return res.status(200).json({status:true, message:"Found record.",data:checkRecord})
  }catch(error){
    next(error)
  }
}

/** ##################################################################################################################### */
/** Update Existing Voter  */
export const updateVoter = async(req, res, next) =>{
  try{
    const {id} = req.body
    console.log("Update object: ", req.body)
    if(!id){
      return res.status(400).json({success:false, message:"Required valid 'id'."})
    };

    const recordCheck = await Voter.findById(id)
    if(!recordCheck){
      return res.status(404).json({success:false, message:"Voter Record Not Found."})
    };

    if(recordCheck.isDeleted || !recordCheck.approved){
      return res.status(400).json({success:false,
        message:"Not allowed to update because either it's 'Deleted' or 'Not Approved'."})
    };

    const updObjSanRes = objSanitizeflatten(req.body)
    console.log("Update Object: ", updObjSanRes)
    const updateRecord = await Voter.findByIdAndUpdate(id,
      {$set:{...updObjSanRes}}, {new:true, runValidators:true})

    return res.status(200).json({success:true, message:"Voter Record Updated Successfully.", data:updateRecord})
  }catch(error){
    next(error)
  }
};

/** ##################################################################################################################### */
/** Delete Existing Voter */
export const deleteVoter = async(req, res, next) => {
  try{
    const {id} = req.query
    if(!id){
      return res.status(400).json({success:false, message:"Required valid 'id'."})
    };

    const deleteRecord = await Voter.findByIdAndUpdate(id,
      {$set:{isDeleted:true}}, {new:true, runValidators:true})

    if(!deleteRecord){
      return res.status(404).json({success:false, message:"Record Not Found."})
    };

    return res.status(200).json({success:false, message:"Voter Record Deleted Successfully.", data:deleteRecord})
  }catch(error){
    next(error)
  }
};