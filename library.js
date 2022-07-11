const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const booksApiRouter = require('./routers/api/books');
const booksRouter = require('./routers/books');
const userRouter = require('./routers/api/user');
const indexRouter = require('./routers/index')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.use('/api/books', booksApiRouter)
app.use('/books', booksRouter)
app.use('/', indexRouter)
app.use('/api/user', userRouter)

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
