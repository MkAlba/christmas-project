const express = require('express');
const posts = require('../controllers/posts.controller');
const router = express.Router();

router.get('/', posts.home);
router.get('/posts/list', posts.list);
router.get('/posts/create', posts.create);
router.post('/posts/create', posts.new);
router.get('/posts/:id', posts.details)
router.post('/posts/:id/delete', posts.delete);
router.get('/posts/:id/edit', posts.edit);

module.exports = router;
