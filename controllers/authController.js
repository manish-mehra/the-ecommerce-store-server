const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {attachCookiesToResponse, createTokenUser} = require('../utils')
const jwt = require('jsonwebtoken')
const login = async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        throw new CustomError.BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    const ifPasswordExist= await user.comparePassword(password)
    if(!ifPasswordExist){
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user: tokenUser})
    res.status(StatusCodes.OK).json({user: tokenUser})
}

const register = async (req, res)=>{

    const {name, email, password} = req.body

    const emailAlreadyExist = await User.findOne({email})

    if(emailAlreadyExist){
        throw new CustomError.BadRequestError('Email already exists') 
    }

    //first registered user is an admin
    // const isFirstAccount = (await User.countDocuments({})) === 0
    // const role = isFirstAccount? 'admin': 'user'

    const user = await User.create({
        name, email, password, role: 'user'
    })
    
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user: tokenUser})
    res.status(StatusCodes.CREATED).json({user: tokenUser})
}

const logout = async (req, res)=>{
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()+ 1000)
    })
    res.status(StatusCodes.OK).json({msg: 'user logged out!'})
}

module.exports = {login, register, logout}