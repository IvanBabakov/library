const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const User = require('../models/userModel');

router.get('/login', async (req, res) => {
    res.render('user/login', {
        title: 'Вход в личный кабинет'
    })
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/user/singup'}),
    async (req, res) => {
        console.log(req.user)
        res.redirect('/')
})

router.get('/logout', async (req, res) => {
    req.session.destroy(function(err){
        res.redirect('/')
    });
});

router.get('/singup', async (req, res) => {
    res.render('user/singup', {
        title: 'Регистрация'
    })
})

router.post('/singup', async (req, res) => {
    const {name, email, password} = req.body

    const newUser = new User({
        name: name,
        email: email,
        password: password
    })
    try {
        await newUser.save();
        res.redirect('/user/login')
    } catch(error) {
        res.redirect('/user/login')
    }
})

router.get('/profile', async (req, res) => {
    if(!req.isAuthenticated()) {
        res.redirect('/user/login')
    } else {
        res.render('user/profile', {
            title: 'Личный кабинет',
            user: req.user
        })
    }        
})

module.exports = router;