const express = require('express')
const dayjs = require('dayjs')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
const appFunc = require('../../helpers/appFunctions')

router.get('/:_id/edit', async (req, res, next) => {
  const categories = await appFunc.getCategoryList()
  const _id = req.params._id
  try {
    const record = await Record.findById({ _id }).lean()
    const { name, categoryId, amount } = record
    const date = dayjs(record.date).format('YYYY-MM-DD')
    res.render('edit', { _id, name, date, categoryId, amount, categories })
  } catch (error) {
    next(error)
  }
})
router.put('/:_id', async (req, res, next) => {
  const body = req.body
  try {
    let record = await Record.findById(req.params._id)
    Object.keys(body).forEach(key => {
      if (typeof (record[key]) === 'number') {
        record[key] = Number(body[key])
      } else if(key === 'date') {
        record[key] = dayjs(body[key]).format('YYYY-MM-DD')
      } else {
        record[key] = body[key]
      }
    })
    await record.save()
    req.flash('success_msg', '成功修改支出！')
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})
router.delete('/:_id', async (req, res, next) => {
  try {
    let record = await Record.findById(req.params._id)
    await record.remove()
    req.flash('success_msg', '成功刪除支出！')
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

module.exports = router