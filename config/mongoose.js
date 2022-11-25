const mongoose = require('mongoose')

//非正式環境使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//mongoose setting
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection
db.once('open',()=>{console.log('MongoDB connect!!!!!')})
db.on('error', () => { console.log('MongoDB connect failed!!')})

module.exports = db