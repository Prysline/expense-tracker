const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const appFunc = require('../helpers/appFunctions')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  },
    async (req, email, password, cb) => {
      try {
        const user = await User.findOne({ email })
        if (!user) return cb(null, false, req.flash('warning_msg', '帳號或密碼輸入錯誤！'))
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return cb(null, false, req.flash('warning_msg', '帳號或密碼輸入錯誤！'))
        return cb(null, user, req.flash('success_msg', '登入成功！'))
      } catch (error) {
        cb(error, false)
      }
    }))
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const { name, email } = profile._json
        const user = await User.findOne({ email })
        if (user) return cb(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        const hash = await bcrypt.hash(randomPassword, await bcrypt.genSalt(10))
        const id = await appFunc.getLatestUserId()
        const newUser = await User.create({ id, name, email, password: hash })
        return cb(null, newUser)
      } catch (error) {
        cb(error, false)
      }
    }))
  passport.serializeUser((user, cb) => cb(null, user._id))
  passport.deserializeUser(async (_id, cb) => {
    try {
      const user = await User.findById(_id).lean()
      cb(null, user)
    } catch (error) {
      cb(error, null)
    }
  })
}