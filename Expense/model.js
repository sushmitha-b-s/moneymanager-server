const Sequelize = require('sequelize')
const db = require('../db')
const Month = require('../Month/model')

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
}, {timestamps: false})

Expense.belongsTo(Month)
Month.hasMany(Expense)


module.exports = Expense