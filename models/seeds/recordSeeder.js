const db = require('../../config/mongoose') // 載入 mongoose
const bcrypt = require('bcryptjs')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const userList = ['廣志', '小新']
const recordList = [
  { name: '午餐', date: new Date(2019, 4, 23), amount: 60, userId: 1, categoryId: 4 },
  { name: '晚餐', date: new Date(2019, 4, 23), amount: 60, userId: 1, categoryId: 4 },
  { name: '捷運', date: new Date(2019, 4, 23), amount: 120, userId: 1, categoryId: 2 },
  { name: '電影：驚奇隊長', date: new Date(2019, 4, 23), amount: 220, userId: 2, categoryId: 3 },
  { name: '租金', date: new Date(2015, 4, 1), amount: 25000, userId: 1, categoryId: 1 }
]

db.once('open', async () => {
  console.log('mongodb connected!')
  // register users
  const user_idList = await registerSeedUsers(userList)
  console.log('seed users registered!')
  // save _id list
  const category_idList = (await Category.find({}).lean()).map((item) => item._id)
  await Promise.all(recordList.map(async (item, index) => {
    return Record.create({
      id: index + 1,
      name: item.name,
      date: item.date,
      amount: item.amount,
      userId: user_idList[item.userId - 1],
      categoryId: category_idList[item.categoryId - 1]
    })
  }))
  console.log('get seed done!')
  process.exit()
})

async function registerSeedUsers (userList) {
  const password = '123'
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return Promise.all(userList.map(async (name, index) => {
    return User.create({ id: index + 1, name, password: hash })
  }))
}