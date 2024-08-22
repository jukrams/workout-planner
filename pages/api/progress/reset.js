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

  if (request.method === "PUT") {
    try {
      const { completedWorkoutsThisWeek } = request.body;

      // Aktualisieren der Statistik
      const collection = database.collection("statistics");

      // Setze den gewünschten Wert auf 0
      await collection.updateMany(
        {},
        { $set: { completedWorkoutsThisWeek: 0 } }
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
