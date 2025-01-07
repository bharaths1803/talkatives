import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./utils/db.js"


const app = express()
dotenv.config()


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectDB();
})