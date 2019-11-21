const {Router} = require('express')
const Month = require('./model')
const Expense = require('../Expense/model')

const router = new Router()

// router.get('/month/:userId', (req,res,next) => {
//     Month.findAll({
//         include: [Expense],
//     where: {
//         userId: req.params.userId
//     }})
//     .then(months => {
//         if(months){
//             return res.status(200).send(months)
//         } else {
//             return res.status(404).send(`There are no days registered`)
//         }
//     })
//     .catch(next)
// })
router.get('/month', (req,res,next) => {
    Month.findAll({
        include: [Expense]})
    .then(months => {
        if(months){
            return res.status(200).send(months)
        } else {
            return res.status(404).send(`There are no days registered`)
        }
    })
    .catch(next)
})

router.get('/month/:monthId', (req,res,next) => {
    Month.findByPk(req.params.monthId, {include : [Expense]})
    .then(month => {
        if(month){
            return res.status(200).send(month)
        } else {
            return res.status(404).send(`There is no such day/month registered`)
        }
    })
    .catch(next)
})

router.post('/month', (req,res,next) => {
    Month.create(req.body)
    .then(month => {
        if(month){
            return res.status(201).send(month)
        } else {
            return res.status(404).end()
        }
    })
    .catch(next)
})

module.exports = router