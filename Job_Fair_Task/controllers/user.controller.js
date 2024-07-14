import User from '../models/user.js'

export const createUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await User.create({
      name,
      email,
      password,
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getUserById = async (req, res) => {
  const userId = req.params.id
  try {
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateUser = async (req, res) => {
  const userId = req.params.id
  const { name, email } = req.body
  try {
    let user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    user.name = name
    user.email = email
    await user.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


export const deleteUser = async (req, res) => {
  const userId = req.params.id
  try {
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    await user.destroy()
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
