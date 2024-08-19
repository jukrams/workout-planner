import mongoose from "mongoose";
const { Schema } = mongoose;

const workoutSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  isFavourite: { type: Boolean, default: false },
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
