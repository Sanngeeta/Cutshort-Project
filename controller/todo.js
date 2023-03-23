const Todo = require("../model/todo");




// Get all Todos
exports.getTodo = (async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.userId.user_id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Create a new Todo
exports.createTodo = (async (req, res) => {
    console.log(req.userId.user_id);
    try {
        const { title, description } = req.body;
        const todo = new Todo({
            title,
            description,
            user: req.userId.user_id
        });
        await todo.save();
        res.json({ message: 'Todo created successfully', todo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// update todo
exports.updateTodo = (async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, },
            { title, description, completed },
            { new: true }
        );
        if (!todo) {

            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo updated successfully', todo });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Delete a Todo by ID
exports.deleteTodo = (async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId.user_id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully', todo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})




// Get a Todo by ID
exports.detailsTodo = (async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.userId.user_id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// PUT route to mark a Todo as complete
exports.markTodoComplete = (async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id); // Find the Todo by its ID
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.completed = true; // Mark the Todo as completed
        await todo.save(); // Save the updated Todo in the database

        res.json(todo); // Return the updated Todo as a response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});