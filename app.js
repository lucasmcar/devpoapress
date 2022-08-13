const express = require('express');
const app = express();
const con = require('./database/database');
const session = require('express-session');

const categoriesController = require('./Controller/categories/CategoriesController');
const articlesController = require('./Controller/articles/ArticlesController');
const usersController = require('./Controller/users/UsersController');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const Article = require('./Model/Article');
const Category = require('./Model/Category');
const User = require('./Model/User');

const router = require('./Controller/categories/CategoriesController');

app.set('view engine', 'ejs');


//redis

//sessão
app.use(session({
    secret: "nodesession91255",
    cookie: {
        maxAge: 30000
    },
    resave: true,
    saveUninitialized: true,
    
}));

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
app.use('/', usersController);

app.get('/session',(req, res) =>{
    req.session.iduser = 1,
    req.session.email = 'teste@teste.com'
    res.send("senssao gerada")
});

app.get('/leitura',(req, res) =>{
    
    res.json({
        id: req.session.iduser,
        email: req.session.email
    });
    
});

app.get("/",(req, res) =>{
    Article.findAll().then(articles => {
        res.render("index", {articles: articles});
    });
}); 

app.get('/:slug', (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug :slug
        }
    }).then(article => {
        if(article != undefined){
            res.render();
        } else {
            res.redirect("/");
        }
    });
});


//Inicialização do app
app.listen(4000, () => {
    console.log("Servidor rodando");
});