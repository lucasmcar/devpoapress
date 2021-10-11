const express = require('express');
const app = express();
const con = require('./database/database');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


const categoriesController = require('./Controller/categories/CategoriesController');
const articlesController = require('./Controller/articles/ArticlesController');

const Article = require('./Model/Article');
const Category = require('./Model/Category');

const router = require('./Controller/categories/CategoriesController');

app.set('view engine', 'ejs');

//Database
con
    .authenticate()
    .then(() => {
        console.log("Conectado com sucesso");
    }).catch((error) => {
        console.log(error);
    });

//Utilizando as rotas que estão desde diretorio
app.use('/', categoriesController);
app.use('/', articlesController);



//Rotas
app.get('/', (req, res) =>{
    res.render('index');
});


//Inicialização do app
app.listen(4000, () => {
    console.log("Servidor rodando");
});