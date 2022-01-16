const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    require: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    require: true
  }
})

module.exports = mongoose.model('Record', recordSchema)