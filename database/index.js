import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/planr');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

export default db;
