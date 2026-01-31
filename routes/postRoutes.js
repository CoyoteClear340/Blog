// specify end points GET/api/posts etc and link to corresponding controller fxn

// import express to get Router fxnality
const express = require('express');

// import all the constrollers 

const{
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} = require('../controllers/postController');

// Routes for the collection endpoint ('/api/posts')
// - A GET request to '/' will trigger the getAllPosts controller.
// - A POST request to '/' will trigger the createPost controller.
const router = express.Router();



// Define routes 

// Routes for collection endpoint ('/api/posts)
router.route('/').get(getAllPosts).post(createPost);

// Routes for the specific document endpoint ('/api/posts/:id')
// The ':id' is a URL parameter that Express will capture for us.
// - A GET request to '/:id' will trigger getPostById.
// - A PATCH request to '/:id' will trigger updatePost. (PATCH is for partial updates)
// - A DELETE request to '/:id' will trigger deletePost.
router.route('/:id').get(getPostById).patch(updatePost).delete(deletePost);

// 5. Export the router.
// This makes our configured router available to be used in our main `server.js` file.
module.exports = router;