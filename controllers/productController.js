const { StatusCodes } = require('http-status-codes')
const {CustomError} = require('../errors/custom-api')
const Product = require('../models/Product')
const path = require('path')

const getAllProducts = async(req, res)=>{
    const products = await Product.find({})
    res.status(StatusCodes.OK).json({products})
}

const getSingleProduct = async(req, res)=>{
    const {id: productId} = req.params
    const product = await Product.findOne({_id: productId})
    if(!product){
        res.status(StatusCodes.NOT_FOUND).json({msg: "product not found"})
    }
    res.status(StatusCodes.OK).json({product})
}

const createProduct = async(req, res)=>{
    req.body.user = req.user.userId
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}
const updateProduct = async(req, res)=>{
    const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
    
}

const deleteProduct = async(req, res)=>{
    const {id: productId} = req.params
    const product = await Product.findOne({_id: productId})
    if(!product){
        throw new CustomError.NotFoundError(`No Product with id: ${productId}`)
    }
    await product.remove()
    res.status(StatusCodes.Ok).json({msg: 'Sucess! Product removed'})
}

const uploadImage = async(req, res)=>{
    if (!req.files) {
        throw new CustomError.BadRequestError('No File Uploaded');
      }
      const productImage = req.files.image;
    
      if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please Upload Image');
      }
    
      const maxSize = 1024 * 1024;
    
      if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError(
          'Please upload image smaller than 1MB'
        );
      }
    
      const imagePath = path.join(
        __dirname,
        '../public/uploads/' + `${productImage.name}`
      );
      await productImage.mv(imagePath);
      res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });

    }


module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    uploadImage
}