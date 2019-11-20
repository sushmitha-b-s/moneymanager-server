const { Router } = require('express')
const Expense = require('./model')
const Day = require('../Month/model')
const Sequelize = require('sequelize')

const router = new Router()

router.post('/expense', (req, res, next) => {
    Expense.create(req.body)
        .then(expense => {
            if (expense) {
                return res.status(201).send(expense)
            } else {
                return res.status(404).end()
            }
        })
        .catch(next)
})

router.get('/expense', (req, res, next) => {
    Expense.findAll({ include: [Day] })
        .then(expenses => {
            if (expenses) {
                return res.status(200).send(expenses)
            } else {
                return res.status(404).end()
            }
        })
})

router.get('/expense/:expenseId', (req, res, next) => {
    Expense.findByPk(req.params.expenseId, { include: [Day] })
        .then(expense => {
            if (expense) {
                return res.status(200).send(expense)
            } else {
                return res.status(404).send({ message: 'Expense not found' })
            }
        })
})

router.put('/expense/:expenseId', (req, res, next) => {
    Expense.findByPk(req.params.expenseId)
        .then(expense => {
            if (!expense) {
                return res.status(404).send({ message: 'Expense not found' })
            } else {
                return expense.update(req.body)
                    .then(expense => res.send(expense))
            }
        })
})

router.delete('/expense/:expenseId', (req, res, next) => {
    Expense.findByPk(req.params.expenseId)
        .then(expense => {
            if (!expense) {
                res.status(404).end()
            } else {
                expense.destroy()
                res.status(200).send({ message: `Expense with Id ${req.params.expenseId} got deleted` })
            }
        })
})


router.get('/percentage/:monthId', (req, res, next) => {
    Expense.findAll({
        attributes: ['category', [Sequelize.fn('sum', Sequelize.col('amount')), 'total']],
        where: {
            monthId: req.params.monthId
        },
        group: ['category']
    })
    .then(expense => {

        const totalAmount = expense.reduce((acc,value) => {
            return acc + parseInt(value.dataValues.total)
        },0)
        
        const percentageCalc = expense.map(e => {
            const percent = ((parseInt(e.dataValues.total)/totalAmount)*100).toFixed(2)

            return {
                percentage: percent,
                category: e.dataValues.category,
                total: parseInt(e.dataValues.total)
            }
        })
        // console.log("percentagecale", percentageCalc)

        res.send({
            expense: percentageCalc,
            totalAmount: totalAmount
        })
    })
    .catch(next)
})

module.exports = router