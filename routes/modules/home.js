const express = require('express')
const router = express.Router()
const userData = require('../../models/user')

//homepage
router.get('/', (req, res) => {
  const cookie = req.cookies.cookieName
  if (cookie) {
    //如果取得cookie
    res.render('logged', { greeting: 'you already logged in!!!' })
  } else {
    //如果沒有取得cookie
    res.render('home')
  }
})

//set login
router.post('/', (req, res) => {
  const { email, password } = req.body
  userData.findOne({ email, password }) //宣告結構變數
    .lean() //將資料庫轉檔
    .then((user) => {
      if (user) {
        const cookie = req.cookies.cookieName
        //if account/password corrected , check cookie exist?
        if (!cookie) { //if not have cookie
          let randomNumber = Math.random().toString()
          randomNumber = randomNumber.substring(2, randomNumber.length) //取小數點後一位數字來當作cookie
          res.cookie('cookieName', randomNumber, { maxAge: 1000 * 60 * 60, httpOnly: true })//一小時後過期
          console.log('cookie created successfully')
        }
        //確認cookie後 render 頁面
        const firstName = user.firstName
        res.render('logged', { greeting: `Hi !!! ${firstName}!!!` })
      } else {
        //if account/password """wrong"""
        res.render('home', { fail: 'fail' })
      }
    })
    .catch(error => console.log(error))
})

//set logout
router.get('/logOut', (req, res) => {
  res.clearCookie('cookieName')
  res.redirect('/')
})

//set profile (test)
router.get('/profile', (req, res) => {
  const cookie = req.cookies.cookieName
  if (cookie) {
    res.render('profile')
  } else {
    res.render('home', { noCookie: 'noCookie' })
  }
})

//set setting (test)
router.get('/setting', (req, res) => {
  const cookie = req.cookies.cookieName
  if (cookie) {
    res.render('setting')
  } else {
    res.render('home', { noCookie: 'noCookie' })
  }
})

module.exports = router