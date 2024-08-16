import mongoose from "mongoose";

const { Schema } = mongoose;
const exerciseSchema = new Schema({
  name: { type: String, required: true },
  muscleGroups: { type: [String], required: true },
  imageUrl: String,
  instructions: { type: [String], required: true },
});

const Exercise =
  mongoose.models.Exercise || mongoose.model("Exercise", exerciseSchema);
export default Exercise;
