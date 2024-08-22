import Statistic from "@/db/models/Statistic";
import dbConnect from "@/db/connect.js";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  // Authentifizierung und Session-Prüfung
  const session = await getServerSession(request, response, authOptions);
  await dbConnect(); // Verbindet zur MongoDB

  // Token erhalten und User-ID extrahieren
  const token = await getToken({ req: request });
  const userId = token?.sub;

  if (request.method === "POST") {
    try {
      // Mongoose-Modell verwenden, um Statistiken zu aktualisieren
      const result = await Statistic.updateMany({
        $set: { completedWorkoutsThisWeek: 0 },
      });

      if (result.modifiedCount === 0) {
        return response
          .status(404)
          .json({ error: "Statistic not found or already updated" });
      }

      // Erfolgreiche Antwort senden
      response.status(200).json({ status: "Statistic successfully updated." });
    } catch (error) {
      console.error("Error during update:", error);
      response.status(400).json({ error: error.message });
    }
  } else {
    // Methode nicht erlaubt
    return response.status(405).json({ message: "Method not allowed" });
  }
}
