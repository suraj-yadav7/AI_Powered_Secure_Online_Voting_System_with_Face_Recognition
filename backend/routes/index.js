import express from "express"
import AuthRouter from "./auth.routes.js"
import VoterRouter from "./voter.routes.js"
import GenericRouter from "./generic.routes.js"
import NomineeRouter from "./nominee.routes.js"
import ElectionRouter from "./election.routes.js"

const V1Router = express.Router()

V1Router.use("/auth", AuthRouter)
V1Router.use("/voter", VoterRouter)
V1Router.use("/generic", GenericRouter)
V1Router.use("/nominee", NomineeRouter)
V1Router.use("/election", ElectionRouter)

export default V1Router;