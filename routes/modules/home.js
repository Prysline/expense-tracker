const express = require('express')
const dayjs = require('dayjs')
const router = express.Router()
const Record = require('../../models/record')
const recordFunc = require('../../helpers/recordFunction')

router.get('/', async (req, res, next) => {
  try {
    const userId = req.user._id
    const categories = await recordFunc.getCategoryList()  // for render category
    const records = await recordFunc.getRecordList({ userId })
    const categoryName = '全部'
    const totalAmount = recordFunc.getTotalAmount(records)
    res.render('index', { categories, records, totalAmount, categoryName })
  } catch (error) {
    next(error)
  }
})
router.get('/index', (req, res) => res.redirect('/'))
router.get('/category/:id', async (req, res, next) => {
  const userId = req.user._id
  const id = req.params.id
  try {
    const categories = await recordFunc.getCategoryList()
    const categoryName = categories[id - 1].name
    const records = await recordFunc.getRecordList({ userId, categoryId: await recordFunc.getCategory_idById(id) })
    const totalAmount = recordFunc.getTotalAmount(records)
    res.render('index', { categories, records, totalAmount, categoryName })
  } catch (error) {
    next(error)
  }
})

router.get('/new', async (req, res,next) => {
  try {
    const categories = await recordFunc.getCategoryList() // for render category
    const today = dayjs().format('YYYY-MM-DD')
    res.render('new', { categories, date: today })
  } catch (error) {
    next(error)
  }
})
router.post('/new', async (req, res, next) => {
  console.log(req.body)
  const { name, date, categoryId, amount } = req.body
  const userId = req.user._id
  const errors = recordFunc.getFormErrors(name, date, categoryId, amount)
  if (errors.length) {
    return res.render('new', { errors, name, date, categoryId, amount})
  }
  try {
    const id = await recordFunc.getLatestRecordId()
    const record = { id, name, date, categoryId, amount, userId }
    await Record.create(record)
    req.flash('success_msg', '成功新增支出！')
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

module.exports = router