const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt')
const validator = require('validator')

// MongoDB connection URI
const uri = "mongodb+srv://kairuhiwatari:Spring22@cluster0.ldxvqfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Connect to MongoDB Atlas
async function connectToDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    return client.db('Cluster0');
  } catch (err) {
    console.error('Error occurred while connecting to MongoDB Atlas', err);
    throw err;
  }
}

// Signup method
async function signup(Firstname, Lastname, Email, Password) {
    // Validation
    if (!Email || !Password) {
      throw new Error('All fields must be filled');
    }
    if (!validator.isEmail(Email)) {
      throw new Error('Email not valid');
    }
    if (!validator.isStrongPassword(Password)) {
      throw new Error('Password not strong enough');
    }
  
    // Connect to the database
    const db = await connectToDatabase();
  
    // Check if email exists
    const exists = await db.collection('users').findOne({ Email });
    if (exists) {
      throw new Error('Email already in use');
    }
  
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(Password, salt);
  
    // Create user document
    const user = { Firstname, Lastname, Email, Password: hash };
  
    // Insert user document into the 'users' collection
    await db.collection('users').insertOne(user);
  
    return user;
  }
  
  // Login method
  async function login(Email, Password) {
    console.log(Email, Password)
    // Validation
    if (!Email || !Password) {
      throw new Error('All fields must be filled');
    }
    console.log(2)
    // Connect to the database
    const db = await connectToDatabase();
    console.log(5)
    // Find user by email
    const user = await db.collection('users').findOne({ Email });
    if (!user) {
      throw new Error('Incorrect email');
    }
    console.log(3)
    // Compare passwords
    const match = await bcrypt.compare(Password, user.Password);
    if (!match) {
      throw new Error('Incorrect password');
    }
    console.log(4)
    return user;
  }
  
  module.exports = { signup, login };