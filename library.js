const express = require('express')
const app = express()

app.get('/api/books', function (req, res) {
  res.send('Hello World')
})

app.put('/api/books/:id', function (req, res) {
    res.send('Hello World')
})

app.post('/api/user/login', function (req, res) {
    res.send('Hello World')
})

app.delete('/api/books/:id', function (req, res) {
    res.send('Hello World')
})

app.listen(3000)