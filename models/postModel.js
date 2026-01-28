const mongoose = require('mongoose'); // schema building capabilities

const postSchema = new mongoose.Schema({ // schema
    title:{
        type: String,
        required:[true, 'A post must have a title'],
        trim: true // middleware that removes leading, trailing whitespaces
    },

    markdownContent:{
        type: String,
        required:[true,'A post must have content']
    },

    author:{
        type:String,
        default:'Admin'
    },

    createdAt:{
        type:Date,
        default: Date.now
    }
});

// 3. Create and export the Mongoose Model.
// The mongoose.model() function compiles the schema into a usable model.
// It takes two arguments:
// - The singular name of the model as a string ('Post'). Mongoose will automatically look for
//   the plural, lowercased version of this name for the collection in the database (i.e., 'posts').
// - The schema to use (postSchema).
// We then use `module.exports` to make this Post model available to other files in our application,
// specifically our controllers.
const Post = mongoose.model('Post', postSchema );

module.exports = Post;