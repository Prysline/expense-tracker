const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')
const appFunc = require('../../helpers/appFunctions')

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不符！' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  try {
    if (await User.findOne({ email })) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      res.render('register', { errors, name, email, password, confirmPassword })
    } else {
      const id = await appFunc.getLatestUserId()
      const hash = await bcrypt.hash(password, await bcrypt.genSalt(10))
      await User.create({ id, name, email, password: hash })
      req.flash('success_msg', '成功註冊！請進行登入！')
      res.redirect('/users/login')
    }
  } catch (error) {
    next(error)
  }
})
router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router
