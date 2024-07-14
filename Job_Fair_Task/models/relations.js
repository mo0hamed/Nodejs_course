// models/index.js
import Category from './category.js'
import Task from './tasks.js'
import User from './user.js'

User.hasMany(Category, { foreignKey: "userId" })
Category.belongsTo(User, { foreignKey: "userId" })

Category.hasMany(Task, { foreignKey: "categoryId" })
Task.belongsTo(Category, { foreignKey: "categoryId" })

export default { User, Category, Task }
