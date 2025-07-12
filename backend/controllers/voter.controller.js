import { payloadChecker } from "../middleware/payloadChecker.js";
import Voter from "../models/voter.model.js";
import { objSanitizeflatten } from "../utils/updateObjSanitise.js";

/** ##################################################################################################################### */
/** Register New Voter */
export const registerVoter = async(req, res, next) =>{
  try{
    const {aadhar_number} = req.body

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
    return res.status(200).json({success:true, message:"Voter Profile Created Successfully.", data:newVoter})
  }catch(error){
    next(error)
  }
};

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