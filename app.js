// import package
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const app = express()

const { engine: exphbs } = require('express-handlebars')
const methodOverride = require('method-override')

// dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// import files
const routes = require('./routes')
require('./config/mongoose')

// set environment
const PORT = process.env.PORT || 3000

// setting template engine
app.engine('.hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// setting session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// setting static files
app.use(express.static('public'))

// setting body-parser
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})