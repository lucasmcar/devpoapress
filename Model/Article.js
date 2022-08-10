const Sequelize = require('sequelize');

const con = require('../database/database');

//Importando a Model categoria
const Category = require('./Category');

const Article = con.define('tb_articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug : {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Um artigo pertence a uma categoria
Article.belongsTo(Category);

//Uma categoria tem muitos artigos
Category.hasMany(Article);


module.exports = Article;