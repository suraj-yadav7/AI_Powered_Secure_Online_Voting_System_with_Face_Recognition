import mongoose from "mongoose";

export const fetchRecords = async(req, res, next) =>{
  try{
    const {data, id} = req.query
    console.log("Fetch Records req.query: ", req.query)
    if(!data){
      return res.status(400).json({success:false, message:"Required valid 'data'."})
    };

    const Model = mongoose.model(data)
    console.log("Model: ", Model)

    if(id){
      const singleRecord = await Model.findById(id)
      if(!singleRecord){
        return res.status(400).json({success:false, message:"Record Not Found."})
      }
      return res.status(200).json({success:true, message:"Single Record Fetched Successfully.", data:singleRecord})
    };

    const records = await Model.find()
    if(!records){
      return res.status(400).json({success:false, message:"Model is empty."})
    };

    return res.status(200).json({success:true, message:"Records fetched Successfully.", data:records})
  }catch(error){
    next(error)
  }
};