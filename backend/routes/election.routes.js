import express from "express";
import { createElection, deleteElection, updateElection } from "../controllers/election.controller.js";

const ElectionRouter = express.Router();

ElectionRouter.post("/create",    createElection)
ElectionRouter.put("/update",     updateElection)
ElectionRouter.delete("/delete",  deleteElection)

export default ElectionRouter;