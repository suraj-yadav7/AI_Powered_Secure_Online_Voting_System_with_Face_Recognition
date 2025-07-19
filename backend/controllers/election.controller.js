import Election from "../models/election.model.js";
import { objSanitizeflatten } from "../utils/updateObjSanitise.js";

/** ##################################################################################################################### */
/** Create New Election */
export const createElection = async(req, res, next) => {
  try{
    const {name, type, nominees} = req.body
    if(!name || !type){
      return res.status(400).json({status:false, message:"Required valid fields 'name, type'."})
    };

    const checkRecord = await Election.findOne({name})
    if(checkRecord){
      return res.status(400).json({success:false, message:"Election already exist with this name."})
    };

    const newElection = new Election({
      name,
      type,
      nominees:nominees
    })
    await newElection.save()
    return res.status(200).json({success:true, message:"New Election Created Successfully.", data:newElection})
  }catch(error){
    next(error)
  }
};

/** ##################################################################################################################### */
/** Update Election Details */
export const updateElection = async(req, res, next) =>{
  try{
    const {id} = req.body
    console.log("Update object: ", req.body)
    if(!id){
      return res.status(400).json({success:false, message:"Required valid 'id'."})
    };

    const recordCheck = await Election.findById(id)
    if(!recordCheck || recordCheck.name.startsWith('e+')){
      return res.status(404).json({success:false, message:"Election Record Not Found."})
    };

    const updObjSanRes = objSanitizeflatten(req.body)
    let updNominees = ""
    if(updObjSanRes?.nominees){
      updNominees = updObjSanRes.nominees
      delete updObjSanRes.nominees
    };

    const updateObject = {
      $set:{...updObjSanRes}
    }
    if(updNominees.length>=1){
      updateObject.$push={nominees:updNominees}
    };

    const updateRecord = await Election.findByIdAndUpdate(id, updateObject, {new:true, runValidators:true})

    return res.status(200).json({success:true, message:"Election Record Updated Successfully.", data:updateRecord})
  }catch(error){
    next(error)
  }
};

/** ##################################################################################################################### */
/** Delete Existing Election */
export const deleteElection = async(req, res, next) => {
  try{
    const {id} = req.query
    if(!id){
      return res.status(400).json({success:false, message:"Required valid 'id'."})
    };

    const electionRecord = await Election.findById(id)
    if(!electionRecord){
      return res.status(404).json({success:false, message:"Election Record Not Found."})
    };

    electionRecord.name = `e+${electionRecord.name}`
    await electionRecord.save()

    return res.status(200).json({success:false, message:"Nominee Record Deleted Successfully.", data:electionRecord})
  }catch(error){
    next(error)
  }
};