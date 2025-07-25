import mongoose from "mongoose";

const nomineeSchema = new mongoose.Schema({
  full_name:{
    type:String,
    requied:true,
    unique:true
  },
  political_party:{
    type:String,
    required:true
  },
  constituency:{
    type:String,
    required:true
  },
  votes_count:{
    type:Number,
    default:0
  }
})

const Nominee = mongoose.model("nominee", nomineeSchema)
export default Nominee;