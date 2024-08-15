import Exercise from "@/db/models/Exercise";
import dbConnect from "@/db/connect.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const exercises = await Exercise.find();
    return response.status(200).json(exercises);
  }
}
