import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  tasks: { type: [Object] },
  token: String,
});

const Users = mongoose.model('User', userSchema);

export default Users; 
