import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, recoveryEmail, DOB, mobileNumber, role } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      firstName,
      lastName,
      username: firstName + lastName,
      email,
      password: hashedPassword,
      recoveryEmail,
      DOB,
      mobileNumber,
      role
    })

    await user.save()
    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const signIn = async (req, res) => {
  const { identifier, password } = req.body 
  try {
    console.log('Identifier: moshkla 1', identifier)
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { mobileNumber: identifier }
      ]
    })

    if (!user) {
      console.log('Identifier: moshkla 2', identifier)
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      console.log('User not found for: moshkla 3', identifier)
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    user.status = 'online'
    await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(200).json({ token, user })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const updateUser = async (req, res) => {
  const { email, mobileNumber, recoveryEmail, DOB, lastName, firstName } = req.body
  const userId = req.user.id

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email })
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' })
      }
      user.email = email
    }

    if (mobileNumber && mobileNumber !== user.mobileNumber) {
      const mobileExists = await User.findOne({ mobileNumber })
      if (mobileExists) {
        return res.status(400).json({ message: 'Mobile number already in use' })
      }
      user.mobileNumber = mobileNumber
    }

    user.recoveryEmail = recoveryEmail || user.recoveryEmail
    user.DOB = DOB || user.DOB
    user.lastName = lastName || user.lastName
    user.firstName = firstName || user.firstName

    await user.save()
    res.status(200).json({ message: 'User updated successfully', user })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const deleteUser = async (req, res) => {
  const userId = req.user.id

  try {
    await User.findByIdAndDelete(userId)
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getUserAccount = async (req, res) => {
  const userId = req.user.id

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getUserProfile = async (req, res) => {
  const { userId } = req.query

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body
  const userId = req.user.id

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid current password' })
    }

    user.password = await bcrypt.hash(newPassword, 12)
    await user.save()

    res.status(200).json({ message: 'Password updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

//I don't have idea how Forget Password work

export const getAccountsByRecoveryEmail = async (req, res) => {
  const { recoveryEmail } = req.body

  try {
    const users = await User.find({ recoveryEmail })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
