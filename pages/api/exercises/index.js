import Exercise from "@/db/models/Exercise";
import dbConnect from "@/db/connect.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const exercises = await Exercise.find();
    return response.status(200).json(exercises);
  }
  // else if (request.method === "POST") {
  //     try {
  //       const workoutData = request.body;
  //       await Workout.create(workoutData);
  //       const workout = new Workout(workoutData);
  //       await workout.save();
  //       return response.status(201).json({ status: "Workout created." });
  //     } catch (error) {
  //       console.error(error);
  //       return response.status(400).json({ error: error.message });
  //     }
  //   }
}
