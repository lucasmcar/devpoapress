const express = require('express');
const router = express.Router();
const User = require('../../Model/User');
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req, res) =>{
    res.send("Listagem de usuarios");
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
                res.redirect('/');
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

module.exports = router;
