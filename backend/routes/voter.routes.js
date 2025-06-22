import express from "express"
import { registerVoter } from "../controllers/voter.controller.js";

const VoterRouter = express.Router()

VoterRouter.post("/register", registerVoter)

export default VoterRouter;