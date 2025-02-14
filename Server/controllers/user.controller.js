import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken.js'
export const register = async (req,res) => {
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password) {
            return res.status(400).json({
                message : "All fields is required !!!",
                success : false
            })
        }
        const existedUser = await User.findOne({email})
        if(existedUser){
            return res.status(401).json({
                message : "User already exists !!!",
                success : false
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        await User.create({
            name,
            email,
            password : hashedPassword
        })
        return res.status(201).json({
            message : "User registered successfully !!!",
            success : true
        })
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body
    if(!email || !password) {
        return res.status(400).json({
            message : "All fields are required !!!",
            required : true
        })
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(401).json({
            message : "User not found !!!",
            success : false
        })
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(401).json({
            message : "User not found !!!",
            success : false
        })
    }
    generateToken(res,user,`Welcome back ${user.name} !!!`)
}