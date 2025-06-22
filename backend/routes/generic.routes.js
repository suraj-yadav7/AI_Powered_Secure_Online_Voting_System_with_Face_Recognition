import express from "express"
import { fetchRecords } from "../controllers/generic.controller.js";

const GenericRouter = express.Router()

GenericRouter.get("/fetch", fetchRecords)

export default GenericRouter;

