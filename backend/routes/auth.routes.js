import express from "express"
import { registerUser } from "../controllers/auth.controllers.js"

const AuthRouter = express.Router()

AuthRouter.post("/register", registerUser)

export default AuthRouter