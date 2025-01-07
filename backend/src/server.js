import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./utils/db.js"
import userRoutes from "./routes/user.route.js"



const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use("/api/users", userRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectDB();
})