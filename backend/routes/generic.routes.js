import express from "express"
import { fetchCount, fetchRecords } from "../controllers/generic.controller.js";

const GenericRouter = express.Router()

GenericRouter.get("/fetch",       fetchRecords)

GenericRouter.get("/fetch-count", fetchCount)

export default GenericRouter;

