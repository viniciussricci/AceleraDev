const jwt = require('jsonwebtoken')
const { auth } = require('../config')

module.exports = (req, res, next) => { 
  try{
    const header = req.get('x-auth-token')
    jwt.verify(header, auth.secret, {maxAge : '1h'})

    next()
  }catch(err){
    res.status(401).json({
      "error": "Invalid token."
    })
  }

  
}
