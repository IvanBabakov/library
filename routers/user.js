const express = require('express');
const router = express.Router();
// const session = require('express-session');
const passport = require('passport');
const User = require('../models/userModel');
// const LocalStrategy = require('passport-local').Strategy

// const verify = (username, password, done) => {
//     console.log(username, password);
//     User.findOne({name: username})
//         .then(user => console.log(user))
    
    // User.findOne(username, (err, user)=> {
    //     if (err) {return done(err)}
    //     if (!user) {return done(null, false) }
        
    //     if (!mongoose.users.verifyPassword(user, password)) {
    //         return done(null, false)
    //     }

    //     return done(null, user)
    // })
// }

// const options = {
//     usernameField: "name",
//     passwordField: "password",
// }

// passport.use('local', new LocalStrategy(options, verify))

// passport.serializeUser((user, cb) => {
//     cb(null, user.id)
// })
// passport.deserializeUser((id, cb) => {
//     mongoose.users.findById(id, (err, user) => {
//         if (err) {return cb(err)}
//         cb(null, user)
//     })
// })

router.get('/login', async (req, res) => {
    res.render('user/login', {
        title: 'Вход в личный кабинет'
    })
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/singup'}),
    async (req, res) => {
        console.log(req.user)
        res.redirect('/')
})

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
        console.log(`Тут какая-то херня! Вот:${error}`)
        res.redirect('/user/login')
    }
})

module.exports = router;