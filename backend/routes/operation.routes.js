import express from "express"
import { castVote, electionResult } from "../controllers/operation.controller.js";

const OperationRouter = express.Router()

OperationRouter.post("/vote",   castVote)
OperationRouter.post("/result", electionResult)

export default OperationRouter;