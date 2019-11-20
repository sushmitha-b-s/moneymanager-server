const {Router} = require('express')
const Day = require('./model')
const Expense = require('../Expense/model')

const router = new Router()

router.get('/month', (req,res,next) => {
    Day.findAll({include: [Expense]})
    .then(days => {
        if(days){
            return res.status(200).send(days)
        } else {
            return res.status(404).send(`There are no days registered`)
        }
    })
    .catch(next)
})

router.get('/month/:monthId', (req,res,next) => {
    Day.findByPk(req.params.monthId, {include : [Expense]})
    .then(day => {
        if(day){
            return res.status(200).send(day)
        } else {
            return res.status(404).send(`There is no such day/month registered`)
        }
    })
    .catch(next)
})

router.post('/month', (req,res,next) => {
    Day.create(req.body)
    .then(day => {
        if(day){
            return res.status(201).send(day)
        } else {
            return res.status(404).end()
        }
    })
    .catch(next)
})

module.exports = router