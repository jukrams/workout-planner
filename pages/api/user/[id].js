import dbConnect from "../../../utils/dbConnect";
import Workout from "../../../models/Workout";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  const { userId } = req.query;

  if (request.method === "GET") {
    const workouts = await Workout.find({ userId });
    return response.status(200).json(workouts);
  } else if (request.method === "PUT") {
    const updatedWorkout = request.body;

    const workout = await Workout.findByIdAndUpdate(id, updatedWorkout);
    return response.status(200).json(workout);
  } else if (request.method === "DELETE") {
    const { workoutId, userId } = request.body;

    try {
      const userUpdate = await User.findByIdAndUpdate(userId, {
        $pull: { workouts: workoutId },
      });

      if (!userUpdate) {
        response.status(404).json({ error: "User not found." });
      }

      const deletedWorkout = await Workout.findByIdAndDelete(workoutId);

      if (!deletedWorkout) {
        response.status(404).json({ error: "Workout not found." });
      }

      response.status(204).end();
    } catch (error) {
      console.error("Error deleting workout:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    response.setHeader("Allow", ["DELETE"]);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
