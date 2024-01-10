// models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role:{type:String,require:true}
 
});

const User = mongoose.model('User', userSchema);

export default User;
