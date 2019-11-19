const User = require('./model')
const { toData } = require('./jwt')

function authMiddleware(req, res, next) {
    const auth = req.headers.authorization && req.headers.authorization.split(' ')
    if (auth && auth[0] === 'Bearer' && auth[1]) {
      try {
        const data = toData(auth[1])
        console.log('checking data',data) //decrypts the token to get the encrypted data(we get userId from encrypted token)
        User
          .findByPk(data.userId)
          .then(user => {
            if (!user) return next('User does not exist')
  
            req.user = user 
            console.log("req.user is..", req.user) //we get details of specific user from user table (any one row details)
            next()
          })
          .catch(next)
      }
      catch(error) {
        res.status(400).send({
          message: `Error ${error.name}: ${error.message}`,
        })
      }
    }
    else {
      res.status(401).send({
        message: 'Please supply some valid credentials'
      })
    }
  }
  
  module.exports = authMiddleware