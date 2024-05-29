const express = require('express');
const posts = require('../controllers/posts.js');
const multer = require('multer');
const auth = require('../controllers/auth.js');

const router = express.Router();
const uploader = multer({dest: "public/imgs/posts"});

//index route
router.get('/', posts.index);

//store route
router.post('/', auth.authCheck, uploader.single("image"),  posts.store);

//show route
router.get('/:slug', posts.show);

module.exports = router;