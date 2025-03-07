import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true, // Ensure that each Google ID is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure each email is unique
  },
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String, // URL of the user's profile picture
  },
},
{
    timestamps: true, 
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;
