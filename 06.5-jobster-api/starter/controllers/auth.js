const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      email: user.email,
      token
    }
  })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({  user: {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      email: user.email,
      token
    } })
}

const updateUser = async (req, res) => {
  const { email, lastName, location, name } = req.body
  const { userId } = req.user
  
   if (!email || !lastName || !location || !name) {
    throw new BadRequestError('Please provide all the info')
  }
  const user = await User.findOne({ _id:userId })
  if (!user) {
    throw new UnauthenticatedError('No such user')
  }

  user.email = email
  user.name = name
  user.location = location
  user.lastName = lastName

  //this will trigger the UserSchema.pre('save' () => {}) hook to take efect and hash the password again
  await user.save()


  const token = user.createJWT()
  res.status(StatusCodes.OK).json({  user: {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      email: user.email,
      token
    } })
}

module.exports = {
  register,
  login,
  updateUser
}
