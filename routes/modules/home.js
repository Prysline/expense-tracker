const express = require('express')
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
    const categories = await getCategoryList()  // for render category
    const records = await getRecordList({})
    const categoryName = '全部'
    const totalAmount = getTotalAmount(records)
    res.render('index', { categories, records, totalAmount, categoryName })
  } catch (error) {
    next(error)
  }
})

router.get('/category/:id', async (req, res) => {
  const id = req.params.id
  try {
    const categories = await getCategoryList()
    const categoryName = categories[id - 1].name
    const records = await getRecordList({ categoryId: await getCategory_idById(id) })
    const totalAmount = getTotalAmount(records)
    res.render('index', { categories, records, totalAmount, categoryName })
  } catch (error) {
    next(error)
  }
})

router.get('/new', async (req, res) => {
  
})

module.exports = router

function getCategoryList () {
  return Category.find({}).lean().sort('id')
}

async function getCategory_idById (id) {
  return (await Category.findOne({ id }).lean())._id
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

function getTotalAmount (records) {
  return records.reduce((total, item) => total + item.amount, 0)
}