import express from "express"
import { deleteVoter, registerVoter, updateVoter } from "../controllers/voter.controller.js";

const VoterRouter = express.Router()

VoterRouter.post("/register",   registerVoter)
VoterRouter.put("/update",      updateVoter)
VoterRouter.delete("/delete",   deleteVoter)

export default VoterRouter;