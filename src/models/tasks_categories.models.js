const db= require("../utils/database");
const {DataTypes}=require("sequelize");
const Categories = require("./categories.models");

const TasksCategories=db.define("tasks_categories",{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false,
  },
  taskId:{
    type:DataTypes.INTEGER,
    field:"tasks_id",
    allowNull:false,
  },
  categoryId:{
    type:DataTypes.INTEGER,
    field:"category_id",
    allowNull:false,
    references:{
        model:Categories,
        key:"id",
    }
  },
},
{
  timestamps:false,
}
);

module.exports = TasksCategories;