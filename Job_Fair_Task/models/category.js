import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
import User from './user.js'

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
})

export default Category
