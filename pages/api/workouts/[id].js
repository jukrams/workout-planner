import dbConnect from "@/db/connect";
import Workout from "@/db/models/Workout";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const workout = await Workout.findById(id);

    if (!workout) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(workout);
  }

  if (request.method === "PUT") {
    try {
      const updatedWorkout = request.body;
      await Workout.findByIdAndUpdate(id, updatedWorkout);
      response.status(200).json({ status: "Workout successfully updated." });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Workout.findByIdAndDelete(id);
      response.status(200).json({ status: "Workout successfully deleted." });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
