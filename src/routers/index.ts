import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", {
        title: "Добро пожаловать в Библиотеку",
        user: req.user
    });
});

export = router;
