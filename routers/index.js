const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", {
        title: "Добро пожаловать в Библиотеку",
        user: req.user
    });
});

module.exports = router;
