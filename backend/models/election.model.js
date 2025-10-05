import mongoose from "mongoose";

const electionSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  type:{
    type:String,
    required:true
  },
  total_votes:{
    type:Number,
    default:0
  },
  result:{
    type:Boolean,
    default:false,
  },
  nominees:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"nominee",
  }],
  enddate:{
    type:Date,
    required:true
  }
}, {timestamps:true})

const Election = mongoose.model("election", electionSchema)
export default Election;