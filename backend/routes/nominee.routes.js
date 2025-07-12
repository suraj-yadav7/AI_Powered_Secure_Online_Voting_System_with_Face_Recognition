import express from "express"
import { createNominee, deleteNominee, updateNominee } from "../controllers/nominee.controller.js"

const NomineeRouter = express.Router()

NomineeRouter.post("/create", createNominee)
NomineeRouter.put("/update", updateNominee)
NomineeRouter.delete("/delete", deleteNominee)

export default NomineeRouter

