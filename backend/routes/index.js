import express from "express"
import AuthRouter from "./auth.routes.js"

const V1Router = express.Router()

V1Router.use("/auth", AuthRouter)

export default V1Router;