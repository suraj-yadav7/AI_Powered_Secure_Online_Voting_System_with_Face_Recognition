import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
  first_name:{
    type:String,
    required:true
  },
  last_name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true,
    unique:true
  },
  gender:{
    type:String,
    enum:["male", "female", "others"],
    requried:true
  },
  isDeleted:{
    type:Boolean,
    default:false,
  },
  isActive:{
    type:Boolean,
    default:false
  },
  profile_type:{
    type:String,
    enum:["user", "admin"],
    default:"user"
  },
  voterId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"voter"
  },
  rejected:{
    type:Boolean,
  }
}, {timestamps:true})

const User = mongoose.model("user", UserSchema)
export default User;