const express = require("express")
const express_hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
require("./config/mongoose")
const  route  = require("./routes")

const app = express()
const PORT = 3000

//set handlebars ＆　bodyParser & cookieParser
app.engine("handlebars", express_hbs.engine({ defaultLayout: 'main' }))
app.set('view engine', "handlebars")
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(route)

//listen
app.listen(PORT, () => {
  console.log(`App is listen on localhost:${PORT}`)
})