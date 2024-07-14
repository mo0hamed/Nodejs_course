import Category from '../models/category.js'

export const createCategory = async (req, res) => {
  const { name, userId } = req.body
  try {
    const category = await Category.create({
      name,
      userId,
    })
    res.status(201).json(category)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


export const getAllCategories = async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc', name, userId } = req.query
  const offset = (page - 1) * limit
  const order = [[sortBy, sortOrder.toUpperCase()]]
  const whereCondition = {}

  if (name) {
    whereCondition.name = name
  }
  if (userId) {
    whereCondition.userId = userId
  }

  try {
    const categories = await Category.findAndCountAll({
      where: whereCondition,
      offset,
      limit,
      order,
    })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getCategoryById = async (req, res) => {
  const categoryId = req.params.id
  try {
    const category = await Category.findByPk(categoryId)
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }
    res.json(category)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateCategory = async (req, res) => {
  const categoryId = req.params.id
  const { name } = req.body
  try {
    let category = await Category.findByPk(categoryId)
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }
    category.name = name
    await category.save()
    res.json(category)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id
  try {
    const category = await Category.findByPk(categoryId)
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }
    await category.destroy()
    res.json({ message: 'Category deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
