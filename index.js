const express = require('express')
const app = express()


// const categoryrouter = require("./api/category/router")
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const port  = process.env.SERVER_PORT || 1002

// const port = 3000


app.use(express.json())
app.use(cors())

app.use('/api',require('./api/user/router')),
app.use('/api',require('./api/Product/router'))
app.use('/api',require("./api/category/router")),


app.use('/api',require("./api/brands/router")),







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})