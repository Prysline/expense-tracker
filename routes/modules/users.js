const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  try {
    if (await User.findOne({ email })) {
      console.log('User already exists.')
      res.render('register', {name, email, password, confirmPassword})
    } else {
      const hash = await bcrypt.hash(password, await bcrypt.genSalt(10))
      await User.create({ name, email, password: hash })
      res.redirect('/users/login')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
