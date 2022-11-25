const express = require("express")
const express_hbs = require('express-handlebars')
require("./config/mongoose")

const app = express()
const PORT = 3000

//set handlebars ＆　bodyParser
app.engine("handlebars", express_hbs.engine({ defaultLayout: 'main' }))
app.set('view engine', "handlebars")
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`App is listen on localhost:${PORT}`)
})