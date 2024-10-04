// app/api/games/route.js
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    // Construire le chemin du fichier JSON
    const filePath = path.join(
      process.cwd(),
      "src/app/data/arena-games-data.json"
    );
    const fileContent = await fs.readFile(filePath, "utf8");

    // Parse et retourne le fichier JSON
    const arenaGamesData = JSON.parse(fileContent);

    //Response.json() une méthode simplifiée introduite par Next.js pour renvoyer une réponse JSON plus facilement. Elle encapsule les appels à JSON.stringify() et les headers appropriés
    return Response.json(arenaGamesData);
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier JSON:", error);
    //On renvoie quand même une réponse au format JSON, mais avec un code d'état 500 (erreur interne du serveur)
    return Response.json(
      { message: "Erreur lors de la récupération des données" },
      {
        status: 500,
      }
    );
  }
}
