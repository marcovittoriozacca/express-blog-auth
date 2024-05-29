const express = require('express');
const posts = require('../controllers/posts.js');
const multer = require('multer');

const router = express.Router();
const uploader = multer({dest: "public/imgs/posts"});

router.get('/', posts.index);
router.post('/', uploader.single("image"),  posts.store);
router.get('/:slug', posts.show);

module.exports = router;