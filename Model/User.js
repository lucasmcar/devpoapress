const Sequelize = require('sequelize');

const con = require('../database/database');

const User = con.define('tb_users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    pass: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//User.sync({force: true});

module.exports = User;