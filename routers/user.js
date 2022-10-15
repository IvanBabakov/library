const express = require('express');
const router = express.Router();
// const session = require('express-session');
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

router.post('/logout', (req, res, next) => {
    req.logOut(function(err) {
      if (err) {
        return next(err); 
    }
      res.redirect('/');
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
        console.log(newUser);
        res.redirect('/user/login')
    } catch(error) {
        console.log(`Тут какая-то херня! Вот:${error}`)
        res.redirect('/user/login')
    }
})

router.get('/profile', (res, req, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect('/user/login')
    }
    next(),
    (req, res) => {
        res.render('profile', {user: req.user})
    }
})

module.exports = router;