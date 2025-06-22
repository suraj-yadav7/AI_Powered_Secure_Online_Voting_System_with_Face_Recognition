const voter = ["first_name", "last_name", "date_of_birth", "gender", "phone", "aadhar_number",
  "email", "address", "constituency", "occupation", "highest_qualification"]

export const payloadChecker = (payload)=>{
  const missingValues = []
  const missingKey = []
  voter.forEach((elem) => {
    if(!payload[elem]) missingValues.push(elem)

    const keyCheck = elem in payload
    if(!keyCheck)  missingKey.push(elem)
  })
  if(missingValues.length<=0 && missingKey.length<=0) return null
  return {missingValuesFields: missingValues, missingKeyFields:missingKey}
}