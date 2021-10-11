const Sequelize = require('sequelize');

const con = new Sequelize('db_devpoapress', 'root', 'Lucas1990',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = con;
