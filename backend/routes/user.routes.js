import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";

const UserRouter = express.Router()

UserRouter.put("/update",     updateUser)
UserRouter.delete("/delete",  deleteUser)

export default UserRouter;