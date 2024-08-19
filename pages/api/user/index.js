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
  } else if (req.method === "POST") {
    const { userId, name, exercises } = req.body;

    try {
      const workout = new Workout({ userId, name, exercises });
      await workout.save();
      await User.findByIdAndUpdate(userId, {
        $push: { workouts: workout._id },
      });

      return res.status(201).json({ status: "Workout created.", workout });
    } catch (error) {
      console.error("Error creating workout:", error);
      return res.status(400).json({ error: error.message });
    }
  } else {
    response.setHeader("Allow", ["POST"]);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
