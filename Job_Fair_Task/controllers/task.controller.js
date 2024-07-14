import Task from '../models/tasks.js'
import Category from '../models/category.js'


export const createTask = async (req, res) => {
  const { title, body, listItems, isShared, categoryId } = req.body
  try {
    const category = await Category.findByPk(categoryId)
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    const task = await Task.create({
      title,
      body,
      listItems,
      isShared,
      categoryId,
    })
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const getAllTasks = async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'title', sortOrder = 'asc', categoryId, isShared } = req.query
  const offset = (page - 1) * limit
  const order = [[sortBy, sortOrder.toUpperCase()]]
  const whereCondition = {}

  if (categoryId) {
    whereCondition.categoryId = categoryId
  }
  if (isShared !== undefined) {
    whereCondition.isShared = isShared
  }

  try {
    const tasks = await Task.findAndCountAll({
      where: whereCondition,
      offset,
      limit,
      order,
    })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getTaskById = async (req, res) => {
  const taskId = req.params.id
  try {
    const task = await Task.findByPk(taskId)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateTask = async (req, res) => {
  const taskId = req.params.id
  const { title, body, listItems, isShared } = req.body
  try {
    let task = await Task.findByPk(taskId)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    task.title = title
    task.body = body
    task.listItems = listItems
    task.isShared = isShared
    await task.save()
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteTask = async (req, res) => {
  const taskId = req.params.id
  try {
    const task = await Task.findByPk(taskId)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    await task.destroy()
    res.json({ message: 'Task deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
