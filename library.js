const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const booksApiRouter = require('./routers/api/books');
const booksRouter = require('./routers/books');
const userRouter = require('./routers/api/user');
const indexRouter = require('./routers/index')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(loggerMiddleware)

app.set('view engine', 'ejs');

app.use('/api/books', booksApiRouter)
app.use('/books', booksRouter)
app.use('/', indexRouter)
app.use('/api/user', userRouter)

app.use(errorMiddleware)

app.listen(3000)