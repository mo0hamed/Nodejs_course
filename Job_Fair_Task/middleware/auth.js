import basicAuth from 'express-basic-auth'
import User from '../models/user.js' 

const auth = basicAuth({

  authorizeAsync: async (username, password, callback) => {
    try {
      
      const user = await User.findOne({ where: { username } })

      if (!user) {
        return callback(null, false)
      }

      const isValidPassword = await user.validatePassword(password)

      if (!isValidPassword) {
        return callback(null, false)
      }

      
      return callback(null, true)
    } catch (error) {
      return callback(error)
    }
  },
  challenge: true,
  realm: 'Custom Realm',
})

export default auth
