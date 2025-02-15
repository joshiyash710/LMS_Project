import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/db.js'
import userRoute from './route/user.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config({})
const app = express()
connectDB()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
app.use('/api/v1/user',userRoute)
app.listen(port,()=>{
    console.log('Server running as port :',port);
    
})