const mongoose = require('mongoose');

require("dotenv").config();


// Connect to MongoDB
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://user:sangeetapaswan@cluster0.kkcyd7x.mongodb.net/cutshortDB?retryWrites=true&w=majority"
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB', err);
});

// const MONGO_URL = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/todoapp'


const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

User= mongoose.model('User', userSchema);
module.exports = User;
