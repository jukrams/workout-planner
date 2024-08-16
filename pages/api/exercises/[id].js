import dbConnect from "../../../db/connect";
import Exercise from "../../../db/models/Exercise";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const exercise = await Exercise.findById(id);

    if (!exercise) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(exercise);
  }
}
