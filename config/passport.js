const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  },
    async (req, email, password, done) => {
      const user = await User.findOne({ email })
      if (!user) return done(null, false, { message: '帳號或密碼輸入錯誤！' })
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return done(null, false, { message: '帳號或密碼輸入錯誤！' })
      return done(null, user)
    }))
  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser(async (_id, done) => {
    try {
      const user = await User.findById(_id).lean()
      done(null, user)
    } catch (error) {
      done(error, null)
    }
  })
}