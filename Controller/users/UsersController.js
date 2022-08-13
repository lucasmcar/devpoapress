const express = require('express');
const router = express.Router();
const User = require('../../Model/User');
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req, res) =>{
    User.findAll()
    .then(users => {
        res.render('admin/users/index', {users: users});
    });
});

router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create');
});

router.post('/users/create', (req, res) => {
    var email = req.body.email;
    var pass = req.body.pass;

    User.findOne({
        where: {email: email}
    }).then( user =>{
        if(user == undefined){
            User.create({ 
                email: email, 
                pass: hash
            }).then(() => {
                return 'Email já existente'
            }).catch((err) => {
                res.redirect('/');
            });
        } else {
            res.redirect('/admin/users/create')
        }
    });

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync( pass, salt );
});

router.get('/login', (req,res)=>{
    res.render('admin/users/login');
});

router.post('/authenticate', (req,res)=>{
    data = {
        email:  req.body.logemail,
        pass: req.body.logpass
    }
    User.findOne({
        where: {email: data.email}
    }).then(user => {
        if(user != undefined){
            //validar senha
            var correct = bcrypt.compareSync(data.pass, user.pass);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email : user.email
                }
                res.status(200).json(
                    req.json.data.user
                );
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    });
});
module.exports = router;
