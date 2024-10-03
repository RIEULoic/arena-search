// "use server";

// import { promises as fs } from "fs";

// //Je dois mettre la logique server ici pour que le code fonctionne. Normalement avec nextjs, je dois pouvoir mettre "use server" inline dans le fichier page.js tout en haut du body de la fonction, mais ça ne fonctionne pas. Où j'ai pas compris. C'est fort possible
// export async function createArenaGamesData() {
//   try {
//     const arenaGamesData = JSON.parse(
//       await fs.readFile(
//         //    J'utilise process.cwd() pour obtenir le chemin absolu du répertoire racine du projet, comme indiqué dans la doc de vercel
//         process.cwd() + "/src/app/data/arena-games-data.json",
//         "utf8"
//       )
//     );
//     return arenaGamesData;
//   } catch (error) {
//     console.error("Error reading arena games data:", error);
//   }
// }

import { promises as fs } from "fs";
import path from "path"; // Ajoute l'importation de path
import ClientComponent from "./ClientComponent"; // Import du composant client

export default async function Home() {
  try {
    // Utilise path pour construire le chemin
    const filePath = path.join(
      process.cwd(),
      "src/app/data/arena-games-data.json"
    );
    const file = await fs.readFile(filePath, "utf8");
    const arenaGamesData = JSON.parse(file);

    console.log("Données serveur:", arenaGamesData); // Ajoute ceci pour voir les données sur le serveur

    return (
      <div>
        <ClientComponent initialData={arenaGamesData} />
      </div>
    );
  } catch (error) {
    console.error(
      "Erreur lors de la lecture du fichier JSON côté serveur:",
      error.message
    );
    return <div>Erreur lors du chargement des données</div>;
  }
}
