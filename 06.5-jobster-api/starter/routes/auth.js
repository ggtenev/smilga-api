const express = require('express')
const authenticationMiddleware = require('../middleware/authentication')
const rateLimiter = require('express-rate-limit')
const router = express.Router()
const { register, login, updateUser } = require('../controllers/auth')

const apiLimiter = rateLimiter({
  winddowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg:'Try again after 15 min'
  }
})


router.post('/register',apiLimiter, register)
router.post('/login',apiLimiter, login)
router.patch('/updateUser', authenticationMiddleware, updateUser)

module.exports = router
