const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const ExerciseSchema = new Schema({
  name: String,
  sets: Number,
  reps: Number
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Exercise", ExerciseSchema);
