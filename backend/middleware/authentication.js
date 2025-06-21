import jwt from "jsonwebtoken"

export const authentication = async(req, res, next) => {
  try{
    const isCookie = req.cookies?.JWT_Token
    if(!isCookie){
      return res.status(400).json({success:false, message:"Cookies Not Found."})
    };
    const jwtSecret = process.env.JWT_SECRET
    await jwt.verify(isCookie, jwtSecret, (error, decode) => {
      if(error){
        return res.status(400).json({success:false, message:"Invalid cookie, Not Authorized."})
      }
      req.user = decode.user
    })
    next()
  }catch(error){
    next(error)
  }
};