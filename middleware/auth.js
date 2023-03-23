// Middleware function to authenticate users
var jwt = require("jsonwebtoken");
require("dotenv").config();

console.log(process.env.JWT_SECRET);
exports.auth = async (req, res, next) => {
    try {
        var token = req.headers.authorization
            ? req.headers.authorization
            : req.cookies.token
        var decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode;

        next();
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            statusCode: 401,
            message: "Unauthorized",
        });
    }
};



const User = require('../model/user')
const Post = require('../model/post');
const Todo = require('../model/todo')
// middleware to check if user is authorized to edit todos/posts
exports.authorizeEdit = (req, res, next) => {
    const userId = req.userId.user_id;
    const id = req.params.id; // or todo ID
    console.log(userId)

    // check if user is admin
    User.findById(userId)
        .then(user => {
            if (user.role === 'admin') {
                // admin can edit any post/todo
                next();
            } else {
                // check if user is owner of post/todo
                Promise.all([
                    Post.findById(id),
                    Todo.findById(id),
                ])
                    .then(([post, todo]) => {
                        if (!post && !todo) {
                            // neither post nor todo found
                            res.status(404).json({ message: 'Resource not found' });

                        } else if (post && post.user == userId) {
                            // regular user can edit their own post
                            next();
                        } else if (todo && todo.user == userId) {
                            // regular user can edit their own todo
                            next();
                        } else {
                            // regular user cannot edit someone else's post/todo 
                            res.status(403).json({ message: 'Unauthorized access' });
                        }

                    }).catch(error => {
                        console.error(error);
                        res.status(500).json({ message: 'Internal Server Error' });
                    })
            }

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
};
