import mongoose, { Schema } from 'mongoose';

const ScheduleSchema = new Schema({
  id: String,
  daytime: Date,
  hall: Number,
  rows: Number,
  seats: Number,
  price: Number,
  taken: [String],
});

const FilmSchema = new Schema({
  id: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  director: { type: String, required: true },
  tags: { type: [String], required: true },
  image: { type: String, required: true },
  cover: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: [ScheduleSchema], required: true },
});

export const Film = mongoose.model('Film', FilmSchema);
