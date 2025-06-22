import express from "express"
import { registerUser, login, validateCookie } from "../controllers/auth.controller.js"
import { authentication } from "../middleware/authentication.js"

const AuthRouter = express.Router()

AuthRouter.post("/register",  registerUser)
AuthRouter.post("/login",     login)
AuthRouter.get("/cookie",     authentication, validateCookie)
AuthRouter.get("/logout",     authentication)

export default AuthRouter;