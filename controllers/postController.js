// 

// Handle all requests from the API (POST, GET, PATCH, DELETE)
// Express does not know how to parse JSON by default
const Post = require('../models/postModel');

/**
 * @desc    Create a new blog post
 * @route   POST /api/posts
 * @access  Public (for now)
 */
const createPost = async (req, res) => {
  try {
    const { title, markdownContent, author } = req.body;

    if (!title || !markdownContent) {
      return res
        .status(400)
        .json({ message: 'Please provide title and content for the post' });
    }

    const newPost = await Post.create({
      title,
      markdownContent,
      author,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: 'Error creating post',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all blog posts
 * @route   GET /api/posts
 * @access  Public
 */
const getAllPosts = async (req, res) => {
  try {
    // Sort posts from newest to oldest
    const posts = await Post.find({}).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching posts',
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single blog post by ID
 * @route   GET /api/posts/:id
 * @access  Public
 */
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error(error);

    // Invalid MongoDB ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: `Invalid post ID format: ${req.params.id}`,
      });
    }

    res.status(500).json({
      message: 'Error fetching post',
      error: error.message,
    });
  }
};

/**
 * @desc    Update an existing blog post
 * @route   PATCH /api/posts/:id
 * @access  Public (for now)
 */
const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // return updated document
        runValidators: true // enforce schema validation
      }
    );

    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error(error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        message: `Invalid post ID format: ${req.params.id}`,
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        error: error.message,
      });
    }

    res.status(500).json({
      message: 'Error updating post',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a blog post
 * @route   DELETE /api/posts/:id
 * @access  Public (for now)
 */
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (deletedPost) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error(error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        message: `Invalid post ID format: ${req.params.id}`,
      });
    }

    res.status(500).json({
      message: 'Error deleting post',
      error: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
