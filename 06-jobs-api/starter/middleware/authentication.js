const { UnauthenticatedError } = require('../errors/index')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


const authenticationMiddleware = async (req, res, next) => {
  const headers = req.headers.authorization

  if (!headers || !headers.startsWith('Bearer')) {
    throw new UnauthenticatedError('Unathenticated request')
  }
  const token = headers.split(' ')[1]
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const { name, userId } = decodedToken
    req.user = { name, id:userId }
    next()
  } catch (error) {
      throw new UnauthenticatedError('Not authorized to acces this route')
  }

 
}

module.exports = authenticationMiddleware