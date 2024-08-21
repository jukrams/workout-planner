import Statistic from "@/db/models/Statistic";
import dbConnect from "@/db/connect.js";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();

  const token = await getToken({ req: request });
  const userId = token.sub;

  if (request.method === "GET") {
    const statistics = await Statistic.find({ owner: userId });
    return response.status(200).json(statistics);
  } else if (request.method === "POST") {
    try {
      const statistictData = request.body;
      await Statistic.create(statistictData);
      response.status(201).json({ status: "Statistic created" });
    } catch (error) {
      console.error(error);
      response.status(405).json({ error: error.message });
    }
  } else if (request.method === "PUT") {
    try {
      const { completedWorkouts, completedWorkoutsThisWeek } = request.body;

      // Aktualisieren der Statistik
      const result = await Statistic.findOneAndUpdate(
        { owner: userId },
        {
          $inc: { completedWorkoutsThisWeek: 1 },
          $push: { completedWorkouts: { $each: completedWorkouts } },
        },
        { new: true, upsert: true }
      );
      if (!result) {
        return response.status(404).json({ error: "Statistic not found" });
      }

      response.status(200).json({ status: "Statistic successfully updated." });
    } catch (error) {
      console.error("Error during update:", error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
