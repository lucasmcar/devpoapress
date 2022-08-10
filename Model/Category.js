const Sequelize = require('sequelize');

const con = require('../database/database');

const Category = con.define('tb_categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug : {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Category;