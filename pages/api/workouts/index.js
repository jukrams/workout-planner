import Workout from "@/db/models/Workout";
import dbConnect from "@/db/connect.js";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();

  if (request.method === "GET") {
    if (session) {
      const token = await getToken({ req: request });
      const userId = token.sub;
      const workouts = await Workout.find({ owner: userId });
      return response.status(200).json(workouts);
    } else {
      const workouts = await Workout.find({ owner: "default" });
      return response.status(200).json(workouts);
    }
  } else if (request.method === "POST") {
    try {
      if (session) {
        const token = await getToken({ req: request });
        const userId = token.sub;
        const workoutData = request.body;
        await Workout.create({ ...workoutData, owner: userId });
        response.status(201).json({ status: "Workout created" });
      } else {
        response.status(401).json({ status: "Not authorized" });
      }
    } catch (error) {
      console.error(error);
      response.status(405).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
