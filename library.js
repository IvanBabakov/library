const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const booksRouter = require('./routers/books');
const userRouter = require('./routers/user')
const app = express();

app.use(bodyParser());
app.use(cors());
app.use(loggerMiddleware)

app.use('/api/books', booksRouter)
app.use('/api/user', userRouter)

app.use(errorMiddleware)

app.listen(3000)