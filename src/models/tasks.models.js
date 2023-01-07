const db =require("../utils/database");
const {DataTypes} =require("sequelize");
const Users= require("./users.models");

const Tasks = db.define("tasks",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    isComplete:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        field:"is_completed",
    },
    userId:{
        type:DataTypes.INTEGER,
        field:"user_id",
        allowNull:false,
        references:{
            model:Users,
            key:"id",
        }
    }
});

module.exports = Tasks;