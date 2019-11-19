const express = require('express')
const db = require('./db')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./User/router')
const dayRouter = require('./Day/router')
const expenseRouter = require('./Expense/router')

const app = express()

const corsMiddleware = cors()
const parserMiddleware = bodyParser.json()
app.use(corsMiddleware)
app.use(parserMiddleware)
app.use(userRouter)
app.use(dayRouter)
app.use(expenseRouter)

port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening to port ${port}`))
