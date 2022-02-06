const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')

router.use('/index', home)
router.use('/', home)

module.exports = router