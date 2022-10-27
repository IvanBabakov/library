import express from 'express';
const router = express.Router();
import passport from 'passport';
import User from '../models/userModel';

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

export = router;