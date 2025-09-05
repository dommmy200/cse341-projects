const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello My World!');
});

module.exports = router;