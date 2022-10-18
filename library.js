const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
// const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./models/userModel');
// const Session = require('./models/sessionMonel');
const LocalStrategy = require('passport-local').Strategy;

const verify = async (username, password, done) => {
    await User.findOne({name: username})
        .then(user => {

            if(!user) {
                return done(null, false, {message: "Can't find User"})
            } else {
                if(password == user.password) {
                    return done(null, user)    
                } else {
                    return done(null, false, {message: "Wrong Password"})
                }
            }
        })
        .catch(err => {
            return done(null, false, {message: err})
        })
}

const options = {
    usernameField: "name",
    passwordField: "password",
}

passport.use('local', new LocalStrategy(options, verify))
passport.serializeUser((user, cb) => {
    cb(null, user._id)
})
passport.deserializeUser((id, cb) => {
    User.findOne({_id: id}, (err, user) => {
        if (err) {return cb(err)}
        cb(null, user)
    })
})

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const booksApiRouter = require('./routers/api/books');
const booksRouter = require('./routers/books');
const userRouter = require('./routers/user');
const indexRouter = require('./routers/index')
const app = express();

//app.use(loggerMiddleware);

app.use(session({ 
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.use('/api/books', booksApiRouter)
app.use('/books', booksRouter)
app.use('/', indexRouter)
app.use('/user', userRouter)

app.use(errorMiddleware)


const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'password';
const NameDB = process.env.DB_NAME || 'books';
const HostDB = process.env.DB_HOST || 'mongodb://localhost:27017/';

async function start() {
    try {
        await mongoose.connect(HostDB, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log(`=== start server PORT ${PORT} ===`);
        });
    } catch(e) {
        console.log(e)
    }
}

start()
