const mongoose = require('mongoose');
import mongoose from 'mongoose'
// Define the schema
const userSchema= new mongoose.Schema({
  publicAddress: { 
    type: String, 
    required: true 
  },
  
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the model
 export default User;
