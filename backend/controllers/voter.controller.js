import { payloadChecker } from "../middleware/payloadChecker.js";
import Voter from "../models/voter.model.js";

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