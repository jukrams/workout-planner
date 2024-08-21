import mongoose from "mongoose";
const { Schema } = mongoose;

const statisticSchema = new Schema({
  owner: { type: String, required: true },
  completedWorkouts: [{ date: { type: String, required: true } }],
  completedWorkoutsThisWeek: { type: Number, required: true },
});

const Statistic =
  mongoose.models.Statistic || mongoose.model("Statistic", statisticSchema);

export default Statistic;
