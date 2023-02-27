const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
const CustomAPIError = require("../errors/custom-error");


const authenticationMIddleware = async (req, res, next) => {
 const authHeaders = req.headers.authorization
  if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided')
  }
  const token = authHeaders.split(' ')[1]

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      const { id, username } = decodedToken
      console.log(decodedToken);
      req.user = { id, username }
      next()
  } catch (error) {
      throw new UnauthenticatedError('Not authorized to acces this route')
  }



}

module.exports = authenticationMIddleware