const express = require('express')
const router = express.Router()

const { dashboard, login } = require('../controllers/main')
const authenticationMIddleware = require('../middleware/auth')



router.route('/dashboard').get(authenticationMIddleware, dashboard)
router.route('/login').post(login)


module.exports = router