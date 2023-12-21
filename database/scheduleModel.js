import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  start: { type: Number, required: true },
  end: { type: Number, required: true }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
