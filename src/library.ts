import express from 'express';
import session from 'express-session';
import BodyParser from 'body-parser';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import passport from 'passport';
import User from './models/userModel';
// const Session = require('./models/sessionMonel');
import LocalStrategy from 'passport-local';

const localStrategy = LocalStrategy.Strategy;
const verify = async (username: string, password: string, done: any) => {
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

passport.use('local', new localStrategy(options, verify))
passport.serializeUser((user: any, cb) => {
    cb(null, user._id)
})
passport.deserializeUser((id, cb) => {
    User.findOne({_id: id}, (err: any, user: any) => {
        if (err) {return cb(err)}
        cb(null, user)
    })
})

// import loggerMiddleware from './middleware/logger';
import errorMiddleware from './middleware/error';

import booksApiRouter from './routers/books';
import booksRouter from './routers/books';
import userRouter from './routers/user';
import indexRouter from './routers/index';
const app = express();

//app.use(loggerMiddleware);

app.use(session({ 
    secret: 'SECRET',
    store: new MongoStore({
        mongoUrl: 'mongodb://Skoge:FI-643-119-b@mongodb:27017',
        dbName: 'library_database',
        collectionName: 'session',
        ttl: 180
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: false}));
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
        mongoose.connect(HostDB, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB
        })

        app.listen(PORT, () => {
            console.log(`=== start server PORT ${PORT} ===`);
        });
    } catch(e) {
        console.log(e)
    }
}

start()
