import express from 'express' 
import dotenv from 'dotenv' 
import cors from 'cors'
import bodyParser from 'body-parser'
import { connectToDatabase } from './config/connectDb.js' 
import userRoute from "./routes/userRoute.js"
import newsRoute from "./routes/newsRoute.js"
dotenv.config()
const app = express()
const port = process.env.port || 5000
connectToDatabase()


// middlewares 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const corsOptions = {
origin:'http://localhost:5173',
credentials:true
}
app.use(cors(corsOptions));


// middlewares 
app.get("/",(req,res)=>{
    res.send("hey it is working")
})
app.use("/user",userRoute)
app.use("/newz",newsRoute)

const PORT = process.env.PORT || 8000;
app.listen(port , () => {
console.log(`Server is running on port ${port}`)
})