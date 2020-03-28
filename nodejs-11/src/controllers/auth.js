const jwt = require('jsonwebtoken')
const { auth } = require('../config')

let Auth = {}

Auth.getToken = async (req, res, next) => {
  const {user, password} = req.body

  if(user !== auth.user || password !== auth.password)
    return res.status(401).json({
      "error": "Invalid user or password."
    })

  const token = jwt.sign({password:auth.password}, auth.secret, { expiresIn: '1h' })

  res.status(200).json({
    token
  })
}

module.exports = Auth
