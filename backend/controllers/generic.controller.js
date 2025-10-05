import mongoose from "mongoose";

/** ##################################################################################################################### */
/** Generic Fetch Records */
export const fetchRecords = async(req, res, next) =>{
  try{
    const {data, id} = req.query
    console.log("Fetch Records req.query: ", req.query)
    if(!data){
      return res.status(400).json({success:false, message:"Required valid 'data'."})
    };

    const Model = mongoose.model(data)

    if(id){
      const singleRecord = await Model.findById(id)
      if(!singleRecord){
        return res.status(400).json({success:false, message:"Record Not Found."})
      }
      return res.status(200).json({success:true, message:"Single Record Fetched Successfully.", data:singleRecord})
    };

    const limit = req.query.limit || 5
    const page  = req.query.page  || 1
    const skipRecord = (page-1)*limit

    const records = await Model.find().skip(skipRecord).limit(limit).sort({"createdAt":-1})
    const totalRecords = await Model.countDocuments()
    const totalPages = Math.ceil(totalRecords/limit)
    if(!records){
      return res.status(400).json({success:false, message:"Model is empty."})
    };

    return res.status(200).json({success:true, message:"Records fetched Successfully.",
      data:{data:records, totalPages, totalRecords, limit, page}})
  }catch(error){
    next(error)
  }
};

/** ##################################################################################################################### */
/** Generic Fetch Records Count. */
export const fetchCount = async(req, res, next) =>{
  try{
    const {data, ...query} = req.query
    console.log("query: ", data, query)
    if(!data){
      return res.status(400).json({status:false, message:"Required valid field: 'data'."})
    };
    const Model = new mongoose.model(data)
    const getCount = await Model.countDocuments(query)
    if(!getCount && getCount !== 0){
      return res.status(404).json({status:false, message:"Record Not Found."})
    };
    return res.status(200).json({status:true, message:"Count Fetched Successfully.", data:getCount})
  }catch(error){
    next(error)
  }
};