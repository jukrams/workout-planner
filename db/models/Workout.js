import mongoose from "mongoose";
import "./Exercise";
const { Schema } = mongoose;

const workoutSchema = new Schema({
  name: { type: String, required: true },
  exercises: [
    {
      _id: false,
      exerciseId: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
    },
  ],
});

const Workout =
  mongoose.models.Workout || mongoose.model("Workout", workoutSchema);

export default Workout;
