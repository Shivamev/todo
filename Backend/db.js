import mongoose from 'mongoose';

const connect = async () => {
  try {
    await mongoose.connect('mongodb+srv://shivams:CH1Q9t73TXCIUl1G@cluster0.2hp4ovc.mongodb.net/Todo', {
    });
    console.log('connected db');
  } catch (error) {
    console.log('error db: ' + error);
  } 
};

export { connect };
