const User = require('../model/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
require("dotenv").config();



exports.userSignup = (async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the email is already taken
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword, role
        });
        await user.save();

        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





// Logging in a user and returning a JWT token
exports.login = (async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET);// process.env.JWT_SECRET
        res.cookie("token", token);

        res.status(200).send({ user: user, token });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message });
    }
});


// user endpoints
// app.get('/users', isAdmin, async (req, res) => {
//     const users = await User.find().select('-password');
//     res.json({ users });
//   });