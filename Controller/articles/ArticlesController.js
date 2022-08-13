const express = require('express');
const router = express.Router();
const Category = require('../../Model/Category');
const Article = require('../../Model/Article');
const slugify = require('slugify');
const adminAuth = require('../../middleware/adminauth');

//rever

router.get('/admin/articles', adminAuth, (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        if(articles != undefined) {
            res.render('admin/articles/index', {articles: articles});
        } 
    });
});

router.get('/admin/articles/new', adminAuth, (req, res) =>{
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories});
    });
});

router.post('/articles/save', (req, res) =>{
        var title = req.body.title;
        var body = req.body.body;
        var category = req.body.category;

        if(title != undefined || title != ""){
            if(body != undefined || body != "") {
                Article.create({
                    title: title,
                    body: body,
                    slug: slugify(title),
                    tbCategoryId: category
                }).then(() => {
                    res.redirect('/admin/articles');
                })
            }
        } else {
            res.redirect('/admin/articles/new');
        }
});

//Deletando o artigo
router.get('/articles/delete/:id', (req, res) => {
    var id = req.params.id;
    if(id != undefined){
        if(!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles');
            });
        } else {
            res.redirect('/admin/articles');
        }
    } else {
        res.redirect('/admin/articles');
    }
});



module.exports = router;