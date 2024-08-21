import dbConnect from "@/db/connect";
import Statistic from "@/db/models/Statistic";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const statistic = await Statistic.findById(id);

    if (!statistic) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(statistic);
  }

  // if (request.method === "PUT") {
  //   try {
  //     const updatedStatistic = request.body;
  //     await Statistic.findByIdAndUpdate(id, updatedStatistic);
  //     response.status(200).json({ status: "Statistic successfully updated." });
  //   } catch (error) {
  //     response.status(400).json({ error: error.message });
  //   }
  // }

  if (request.method === "DELETE") {
    try {
      await Workout.findByIdAndDelete(id);
      response.status(200).json({ status: "Statistic successfully deleted." });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
