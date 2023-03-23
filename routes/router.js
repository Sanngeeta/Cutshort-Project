const express = require("express");
const { createPost, getAllPost, deatilsPost, addComment, addCommentsOtherUser, getTodoByUserId, updatePost } = require("../controller/post");
const { createTodo, deleteTodo, updateTodo, getTodo, detailsTodo, markTodoComplete } = require("../controller/todo");
const { userSignup, login } = require("../controller/user");
const { auth, authorizeEdit } = require("../middleware/auth");
const router = express.Router();


router.post('/user',userSignup)
router.post('/login',login)


// Todo API
router.post('/todos',auth,createTodo)
router.get('/todos',auth,getTodo)
router.put('/todos/:id',auth,authorizeEdit,updateTodo)
router.delete('/todos/:id',auth,deleteTodo)
router.get('/todos/:id',auth,detailsTodo)
router.put('/todos/:id/complete',auth,markTodoComplete)



// Post API
router.post('/posts',auth,createPost)
router.get('/posts',auth,getAllPost)
router.get('/posts/:id',auth,deatilsPost)

router.put('/posts/:id',auth,authorizeEdit,updatePost)


// Add a comment to a post
router.post('/posts/:id/comments',auth,addComment)
// Add a comment to a user's post
router.post('/users/:userId/posts/:postId/comments',auth,addCommentsOtherUser)

// Get all todos for a user by ID
router.get('/users/:id/todos',auth,getTodoByUserId)










module.exports = router;
