// import Workout from "@/db/models/Workout";
// import dbConnect from "@/db/connect.js";

// export default async function handler(request, response) {
//   await dbConnect();

//   if (request.method === "GET") {
//     const workouts = await Workout.find();
//     return response.status(200).json(workouts);
//   } else if (request.method === "POST") {
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
// }
import Workout from "@/db/models/Workout";
import dbConnect from "@/db/connect.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const workouts = await Workout.find();
      return response.status(200).json(workouts);
    } catch (error) {
      console.error("Error fetching workouts:", error);
      return response.status(500).json({ error: "Failed to fetch workouts." });
    }
  } else if (request.method === "POST") {
    try {
      const workoutData = request.body;
      const workout = await Workout.create(workoutData);
      return response.status(201).json({ status: "Workout created.", workout });
    } catch (error) {
      console.error("Error creating workout:", error);
      return response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ error: "Method not allowed" });
  }
}
