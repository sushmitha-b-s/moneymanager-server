const Sequelize = require('sequelize')
const db = require('../db')
const User = require('../User/model')

const Day = db.define('day',{
    monthoftheyear:{
        type: Sequelize.STRING
    }
})

// Day.belongsTo(User)
// User.hasMany(Day)

module.exports = Day