const Sequelize = require('sequelize')
const db = require('../db')
const User = require('../User/model')

const Month = db.define('month',{
    monthoftheyear:{
        type: Sequelize.STRING,
        allowNull: false
    },
    income: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {timestamps: false})

Month.belongsTo(User)
User.hasMany(Month)

module.exports = Month