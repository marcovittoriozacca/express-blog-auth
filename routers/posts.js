const express = require('express');
const posts = require('../controllers/posts.js');

const router = express.Router();


router.get('/', posts.index);


module.exports = router;