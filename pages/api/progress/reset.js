import Statistic from "@/db/models/Statistic";
import dbConnect from "@/db/connect.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "PUT") {
    try {
      const result = await Statistic.updateMany({
        $set: { completedWorkoutsThisWeek: 0 },
      });

      if (result.modifiedCount === 0) {
        return response
          .status(404)
          .json({ error: "Statistic not found or already updated" });
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
