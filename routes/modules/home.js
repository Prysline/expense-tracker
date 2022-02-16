const express = require('express')
const dayjs = require('dayjs')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
const CATEGORY = {
  家居物業: "home",
  交通出行: "shuttle-van",
  休閒娛樂: "grin-beam",
  餐飲食品: "utensils",
  其他: "pen"
}

router.get('/', async (req, res, next) => {
  try {
    const userId = req.user._id
    const categories = await getCategoryList()  // for render category
    const records = await getRecordList({ userId })
    const categoryName = '全部'
    const totalAmount = getTotalAmount(records)
    res.render('index', { categories, records, totalAmount, categoryName })
  } catch (error) {
    next(error)
  }
})
router.get('/index', (req, res) => res.redirect('/'))
router.get('/category/:id', async (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  try {
    const categories = await getCategoryList()
    const categoryName = categories[id - 1].name
    const records = await getRecordList({ userId, categoryId: await getCategory_idById(id) })
    const totalAmount = getTotalAmount(records)
    res.render('index', { categories, records, totalAmount, categoryName })
  } catch (error) {
    next(error)
  }
})

router.get('/new', async (req, res) => {
  const categories = await getCategoryList() // for render category
  const today = dayjs().format('YYYY-MM-DD')
  res.render('new', { categories, today })
})
router.post('/new', async (req, res, next) => {
  console.log(req.body)
  const { name, date, category, amount } = req.body
  const userId = req.user._id
  const errors = getFormErrors(name, date, category, amount)
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  try {
    const id = await getLatestRecordId()
    const categoryId = await getCategory_idByName(category)
    const record = { id, name, date, categoryId, amount, userId }
    await Record.create(record)
    req.flash('success_msg', '成功新增支出！')
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

module.exports = router

function getCategoryList () {
  return Category.find({}).lean().sort('id')
}

async function getCategory_idById (id) {
  return (await Category.findOne({ id }).lean())._id
}
async function getCategory_idByName (name) {
  return (await Category.findOne({ name }).lean())._id
}

async function getRecordList (condition) {
  const categories = await getCategoryList()
  // condition: object
  return Promise.all((await Record.find(condition).lean().sort('id')).map(async (item) => {
    const categoryName = (await Category.findById(item.categoryId).lean()).name
    return {
      category: `/icons/${CATEGORY[categoryName]}-solid.svg`,
      name: item.name,
      date: [item.date.getFullYear(), item.date.getMonth(), item.date.getDay()].join('.'),
      amount: item.amount,
      _id: item._id
    }
  }))
}
async function getLatestRecordId () {
  const records = await Record.find().lean().sort('-id')
  return records[0].id + 1
}

function getTotalAmount (records) {
  return records.reduce((total, item) => total + item.amount, 0)
}

function getFormErrors (name, date, category, amount) {
  const errors = []
  if (!name || !date || !category || !amount) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (amount < 0) {
    errors.push({ message: '請輸入大於等於 0 的數字。' })
  }
  return errors
}