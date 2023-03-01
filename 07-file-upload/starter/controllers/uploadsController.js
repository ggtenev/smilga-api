const { StatusCodes } = require('http-status-codes')
const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
const CustomError = require('../errors/')

const uploadProductImageLocal = async (req, res) => {
  console.log(req.files)
  //check if file exists
  if (!req.files) {
    throw new CustomError.BadRequestError('No file uploded')
  }
  //check format
  //check size

  let productImage = req.files.image

  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please upload an image')
  }

  const maxSize = 1024 * 1024
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError('Please uplaod image smaller than ' + maxSize + ' KB')
  }
  
  const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)
  await productImage.mv(imagePath)


  return res.status(StatusCodes.OK).json({
    image: {
    src:`/uploads/${productImage.name}`
  }})
}

const uploadProductImage = async (req, res) => {

  const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    use_filename: true,
    folder:'07-file-upload'
    
  })
  fs.unlinkSync(req.files.image.tempFilePath)
  console.log(result);
  
  res.status(StatusCodes.CREATED).json({image:{src:result.secure_url}})
}



module.exports = {uploadProductImage}