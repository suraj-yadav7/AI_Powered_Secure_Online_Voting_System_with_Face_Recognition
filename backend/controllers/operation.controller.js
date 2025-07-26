import Voter    from "../models/voter.model.js";
import Nominee  from "../models/nominee.model.js";
import Election from "../models/election.model.js";

/** ##################################################################################################################### */
/** Caste Vote */
export const castVote = async(req, res, next) => {
  try{
    const {voterId, electionId, nomineeId} = req.body
    if(!voterId || !electionId || !nomineeId){
      return res.status(400).json({success:false, message:"Required valid fields 'voterId, electionId, nomineeId'."})
    };

    const checkVoter = await Voter.findById(voterId)
    if(!checkVoter){
      return res.status(404).json({success:false, message:"Voter Record Not Found."})
    };

    if(checkVoter.casted_vote){
      return res.status(400).json({success:false, message:"You have already casted vote."})
    };

    const checkElection = await Election.findById(electionId)
    if(!checkElection){
      return res.status(404).json({success:false, message:"Election Record Not Found."})
    };
    if(checkElection.result){
      return res.status(400).json({success:false, message:"Voting time for this election finished."})
    };

    const checkNominee = await Nominee.findById(nomineeId)
    if(!checkNominee){
      return res.status(400).json({success:false, message:"Nominee Record Not Found."})
    };

    //Update the vote count in electon and nominee field
    const electionRecordUpd = await Election.findByIdAndUpdate(electionId,
      { $inc:{total_votes:1}}, {new:true, runValidators:true})

    const nomineeRecordUpd = await Nominee.findByIdAndUpdate(nomineeId,
      {$inc:{votes_count:1}}, {new:true, runValidators:true})

    const voterRecordUpd = await Voter.findByIdAndUpdate(voterId,
      {$set:{casted_vote:true}}, {new:true, runValidators:true})

      return res.status(200).json({success:true, message:"Vote-Casted successfully.",
        data:{voterData:voterRecordUpd, nomineeData:nomineeRecordUpd, elctionData:electionRecordUpd}})
  }catch(error){
    next(error)
  }
};

/** ##################################################################################################################### */
/** Election Result */
export const electionResult = async(req, res, next) => {
  try{
    const {electionId} = req.body
    if(!electionId){
      return res.status(400).json({success:false, message:"Required valid field: 'electionId'."})
    };

    const checkElection = await Election.findById(electionId)
    if(!checkElection){
      return res.status(400).json({success:false, message:"Election Record Not Found."})
    };

    const {nominees} = checkElection
    const allNomineesRecord = nominees && nominees.map(async(id) => {
      const nomineeRecord = await Nominee.findById(id)
      return nomineeRecord
    })
    await Promise.all(allNomineesRecord)

    const maxVote = -Infinity
    let wonNominee =""
    allNomineesRecord && allNomineesRecord.forEach((elem) => {
      if(elem.votes_count > maxVote){
        wonNominee = elem
      }
    });

    return res.status(200).json({success:false, message:"Election result fetched successfully.",
      data:{nomineeData:allNomineesRecord, winnerCandidate:wonNominee}
    })
  }catch(error){
    next(error)
  }
};