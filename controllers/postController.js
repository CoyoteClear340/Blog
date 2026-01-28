//handle all the request fromt he API POST etc
// express does not know hoe to parse JSON
const Post = require('../models/postModel')

/**
 * @desc    Create a new blog post
 * @route   POST /api/posts
 * @access  Public (for now)
 */

const createPost = async (req,res) =>{

    try{
        const {title,markdownContent,author} =req.body;

        if(!title || !markdownContent){
            return res.status(400).json({message:'Please give title and content for post'});
        }

        const newPost = await Post.create({
            title,
            markdownContent,
            author,
        });

        res.send.status(201).json(newPost);
    }catch(err){
        console.log(err);
        res.status(400).json({message:'Error creating post ' ,err:err.message})
    }

};


const getAllPosts = async(req,res)=>{
    try{
        const posts= (await Post.find({})).toSorted({createdAt:-1});
        /*his is the core of our logic. We tell Mongoose to go to the posts collection, find all documents ({}), and then sort them by the createdAt field from newest to oldest (-1). The await keyword pauses the function until the database returns the results.*/
        res.status(200).json(posts);
    }catch (error){
        console.log(error);
        res.send(508).json({message:'Error fetching posts', error:error.message});
    }
}

const getPostById = async(req,res) =>{
    try{
        // The `req.params.id` is automatically populated by Express from the route (e.g., /api/posts/some_id_value).
        const post = await Post.findById(req.params.id);

        if(post)// if found
        {
            res.status(200).json(post);
        }else{
            
            res.status(404).json({message:'Post not found'});
        }
    }catch (error){
         console.error(error);
         // A common error here is a `CastError` from Mongoose, which occurs if the provided ID
    // is not in a valid ObjectId format. This is a client-side error (bad request).
    if (error.name === 'CastError') {
      return res.status(400).json({ message: `Invalid post ID format: ${req.params.id}` });
    }

    // For all other types of errors (e.g., database connection issues),
    // we send a 500 Internal Server Error.
    res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
};