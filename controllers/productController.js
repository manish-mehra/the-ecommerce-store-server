const { StatusCodes } = require('http-status-codes')
const {CustomError} = require('../errors/custom-api')
const Product = require('../models/Product')

const getAllProducts = async(req, res)=>{
    res.send('get all product')
}

const getSingleProduct = async(req, res)=>{
    res.send('get single product')
}

const createProduct = async(req, res)=>{
    req.body.user = req.user.userId
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}
const updateProduct = async(req, res)=>{
    res.send('updateProduct')
}

const deleteProduct = async(req, res)=>{
    res.send('delete product')
}

const uploadImage = async(req, res)=>{
    res.send('upload image')
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    uploadImage
}