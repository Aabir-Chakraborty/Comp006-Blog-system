const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { isAuthenticated, isAuthor } = require('../utils/middleware');
const methodOverride = require('method-override');

// Method override for PUT/DELETE
router.use(methodOverride('_method'));

// Get all posts
router.get('/', postController.getAllPosts);

// Create post
router.post('/create', isAuthenticated, postController.postCreatePost);

// Get single post
router.get('/:id', postController.getPost);

// Edit post
router.put('/:id', isAuthenticated, isAuthor, postController.putEditPost);

// Delete post
router.delete('/:id', isAuthenticated, isAuthor, postController.deletePost);

module.exports = router;