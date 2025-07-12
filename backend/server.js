import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import colors from "colors"
import morgan from "morgan"
import connectDB from "./config/dbConnect.js"
import { globalErrorHandler } from "./middleware/errorHandler.js"
import V1Router from "./routes/index.js"
import cookieParser from "cookie-parser"

dotenv.config()
const mode = process.env.MODE
const port = process.env.PORT || 4000
const clientUrl = process.env.CLIENT_URL

const app = express()
const AppRouter = express.Router()

/** Connect to Mongodb */
connectDB()
.then((success) => {
    console.log(`Successfully Mongodb Connected: ${success}`.bgGreen.white)
    app.listen(port, ()=>{
    console.log(`Server is running in ${mode} environment at ${port}.`.bgWhite.cyan)
  })
})
.catch((error) => {
  console.log(`Error occured while connecting to db : ${error}`.bgRed.white)
});

app.get("/", (req, res) => {
  return res.send("<h1>AI-Powered Secure Online Voting System.</h1>")
})

const corsOption = {
  origin:clientUrl,
  method:["GET", "POST", "PUT", "DELETE"],
  credentials:true,
  optionSuccessStatus:200
};

/** Packages Initialization */
app.use(express.json())
app.use(cors(corsOption))
app.use(morgan("dev"))
app.use(cookieParser())

/** V1 All Routes */
AppRouter.use("/v1", V1Router)
app.use("/api", AppRouter)

/** Global Error Handler */
app.use(globalErrorHandler)

app.use((req, res)=>{
  res.status(404).send("<h1> Sorry 404 Page Not Found.</h1>")
});