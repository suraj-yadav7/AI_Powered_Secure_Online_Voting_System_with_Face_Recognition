import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import colors from "colors"

dotenv.config()
const mode = process.env.MODE
const port = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  return res.send("<h1>AI-Powered Secure Online Voting System.</h1>")
})

app.listen(port, ()=>{
  console.log(`Server is running in ${mode} environment at ${port}.`.bgWhite.cyan)
})

app.use("" ,(req, res)=>{
  res.status(404).send("<h1> Sorry 404 Page Not Found.</h1>")
})