const Record = require('../models/record')
const Category = require('../models/category')
const User = require('../models/user')
const CATEGORY = {
  家居物業: "home",
  交通出行: "shuttle-van",
  休閒娛樂: "grin-beam",
  餐飲食品: "utensils",
  其他: "pen"
}

module.exports = {
  getCategoryList: () => {
    return Category.find({}).lean().sort('id')
  },

  getCategory_idById: async (id) => {
    return (await Category.findOne({ id }).lean())._id
  },
  getRecordList: async (condition) => {
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
  },
  getLatestRecordId: async () => {
    const records = await Record.find().lean().sort('-id')
    return records[0].id + 1
  },
  getTotalAmount: (records) => {
    return records.reduce((total, item) => total + item.amount, 0)
  },
  getFormErrors: (name, date, categoryId, amount) => {
    const errors = []
    if (!name || !date || !categoryId || !amount) {
      errors.push({ message: '所有欄位都是必填。' })
    }
    if (amount < 0) {
      errors.push({ message: '請輸入大於等於 0 的數字。' })
    }
    return errors
  }
}