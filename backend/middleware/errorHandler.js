export const globalErrorHandler = async(err, req, res, next)=>{
  const {method, url} = req
  console.log(`Error for ${method} method at ${url}, Error Message: ${err.stack}`)
  return res.status(500).json({status:false, message:"Internal Server Error."})
};