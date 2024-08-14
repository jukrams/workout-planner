import mongoose from "mongoose";
import "./Exercise";
const { Schema } = mongoose;

const workoutSchema = new Schema({
  name: { type: String, required: true },
  exercises: [
    {
      exerciseId: {
        type: [Schema.Types.ObjectId],
        ref: "Exercise",
        required: true,
      },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
    },
  ],
});

const Workout =
  mongoose.models.Workout || mongoose.model("Workout", workoutSchema);

export default Workout;
