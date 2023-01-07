const {Sequelize} =require("sequelize");

const db =new Sequelize({
  database:'tasks_db',
  username:"postgres",
  host:"localhost",
  port:"5432",
  password:"1234",
  dialect:"postgres",
});

module.exports =db;