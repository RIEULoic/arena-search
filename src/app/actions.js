"use server";

import { promises as fs } from "fs";

//Je dois mettre la logique server ici pour que le code fonctionne. Normalement avec nextjs, je dois pouvoir mettre "use server" inline dans le fichier page.js tout en haut du body de la fonction, mais ça ne fonctionne pas. Où j'ai pas compris. C'est fort possible
export async function createArenaGamesData() {
  const arenaGamesData = JSON.parse(
    await fs.readFile(
      //    J'utilise process.cwd() pour obtenir le chemin absolu du répertoire racine du projet, comme indiqué dans la doc de vercel
      process.cwd() + "/src/app/data/arena-games-data.json",
      "utf8"
    )
  );

  return arenaGamesData;
}
