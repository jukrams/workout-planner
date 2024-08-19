import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    const { name, githubId } = request.body;

    if (!name || !githubId) {
      return response
        .status(400)
        .json({ error: "Name and GitHub ID are required" });
    }

    try {
      const existingUser = await User.findOne({ githubId });
      if (!existingUser) {
        const newUser = new User({ name, githubId });
        await newUser.save();

        console.log("User saved:", newUser);
        return response.status(201).json(newUser);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return response
        .status(500)
        .json({ error: "Server error", details: error.message });
    }
  } else {
    response.setHeader("Allow", ["POST"]);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
