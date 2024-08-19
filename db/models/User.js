import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  githubId: { type: String, required: true, unique: true },
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
