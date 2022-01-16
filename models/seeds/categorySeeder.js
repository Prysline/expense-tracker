const db = require('../../config/mongoose') // 載入 mongoose
const bcrypt = require('bcryptjs')
const Category = require('../category')
const categoryList = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

db.once('open', async () => {
  console.log('mongodb connected!')
  await Promise.all(categoryList.map(async (item, index) => {
    return Category.create({id: index+1, name: item})
  }))
  console.log('Category created!')
  process.exit()
})