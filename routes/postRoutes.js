const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send({'Hello': 'Welcome to the API from postRoutes.js'});
});

module.exports = router;
