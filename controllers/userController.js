const { StatusCodes } = require('http-status-codes')
const {CustomError} = require('../errors/custom-api')
const User = require('../models/User')
const {checkPermissions} = require('../middleware/authentication')

const getAllUsers = async (req, res)=>{
    //Get all users where role is 'user' and remove password
    console.log(req.user)
    const users = await User.find({ role: 'user' }).select('-password')
    res.status(StatusCodes.OK).json({users})
}


const getSingleUser = async(req, res)=>{
    
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    if (!user) {
      throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }
    // checkPermissions(req.user, user._id);
    res.status(StatusCodes.OK).json({ user });
}

const showCurrentUser = async(req, res)=>{
    res.send('show currentuser')
}

const updateUser = async(req, res)=>{
    res.send('update user')
}

const updateUserPassword = async(req , res)=>{
    res.send('update user password')
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}
