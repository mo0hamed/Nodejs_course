import { DataTypes } from 'sequelize'
import Category from './category.js'
import sequelize from '../config/db.js'
const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  listItems: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  isShared: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: "id",
    },
  },
})

export default Task