import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/db.js'
import userRoute from './route/user.route.js'
dotenv.config({})
const app = express()
connectDB()
const port = process.env.PORT || 3000
app.use('api/v1/user',userRoute)
app.listen(port,()=>{
    console.log('Server running as port :',port);
    
})