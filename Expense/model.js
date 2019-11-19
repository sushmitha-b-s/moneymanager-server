const Sequelize = require('sequelize')
const db = require('../db')
const Day = require('../Day/model')

const Expense = db.define('expense', {
    category: {
        type: Sequelize.STRING
    },
    memo: {
        type: Sequelize.STRING
    },
    amount: {
        type: Sequelize.INTEGER
    }
})

Expense.belongsTo(Day)
Day.hasMany(Expense)


module.exports = Expense