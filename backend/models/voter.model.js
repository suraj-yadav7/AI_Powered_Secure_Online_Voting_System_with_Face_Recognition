import mongoose from "mongoose";

const voterSchema = new mongoose.Schema({
  first_name:{
    type:String,
    required:true
  },
  last_name:{
    type:String,
    required:true
  },
  date_of_birth:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true,
    uinque:true
  },
  aadhar_number:{
    type:Number,
    required:true,
    uinque:true
  },
  email:{
    type:String,
    required:true,
    uinque:true
  },
  address:{
    house_no:{
      type:String,
      required:true
    },
    locality:{
      type:String,
      required:true
    },
    landmark:{
      type:String,
      required:true
    },
    mandal:{
      type:String,
      required:true,
    },
    district:{
      type:String,
      required:true
    },
    city:{
      type:String,
      required:true
    },
    state:{
      type:String,
      required:true
    },
    pincode:{
      type:String,
      required:true
    }
  },
  constituency:{
    type:String,
    required:true
  },
  occupation:{
    type:String,
    required:true
  },
  highest_qualification:{
    type:String,
    required:true
  },
  face_encodings: {
    type: [[Number]],
    default: []
  },
  face_version:{
    type: Number,
    default: 1
  },
  face_enrolled_at:{
    type: Date
  },
  isDeleted:{
    type:Boolean,
    default:false
  },
  approved:{
    type:Boolean,
    default:false
  },
  casted_vote:{
    type:Boolean,
    default:false
  }
}, {timestamps:true})

const Voter = mongoose.model("voter", voterSchema)

export default Voter;