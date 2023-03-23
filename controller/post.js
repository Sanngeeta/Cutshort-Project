const Post = require('../model/post');
const todo = require('../model/todo');
console.log(Post);
// Create a new post
exports.createPost = (async (req, res) => {
    try {
        const post = new Post({
            text: req.body.text,
            user: req.userId.user_id
        });
        await post.save();
        res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all posts
exports.getAllPost = (async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username');
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single post by ID
exports.deatilsPost = (async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'username');
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add a comment to a post
exports.addComment = (async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        const comment = {
            text: req.body.text,
            user: req.userId.user_id
        };
        post.comments.push(comment);
        await post.save();
        res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
});



// User can query other users and view their details

// Add a comment to a user's post
exports.addCommentsOtherUser = (async (req, res) => {
    try {
        const post = await Post.findOne({
            _id: req.params.postId,
            user: req.params.userId
        });
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        const comment = {
            text: req.body.text,
            user: req.userId.user_id
        };
        post.comments.push(comment);
        await post.save();
        res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all todos for a user by ID
exports.getTodoByUserId = (async (req, res) => {
    try {
        const todos = await todo.find({ user: req.params.id });
        res.json({ message: "Get user Todo", todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



// Update a post by ID
exports.updatePost = (async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!post) {
            return res.status(404).send({ message: 'post not found' });
        }

        res.send(post);
    } catch (e) {
        res.status(400).send(e);
    }
});