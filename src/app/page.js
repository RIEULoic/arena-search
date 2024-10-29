"use client";

import { useEffect, useState } from "react";

import GameCard from "./components/GameCard";

export default function Home() {
  const [arenaGamesData, setArenaGamesData] = useState([]);

  useEffect(() => {
    // Appeler l'API route pour récupérer les données JSON
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setArenaGamesData(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  return (
    <div>
      {arenaGamesData.length > 0 ? (
        <div className="p-5 grid lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-2 ">
          {arenaGamesData.map((game) => (
            <GameCard key={game.geekID} game={game} />
          ))}
        </div>
      ) : (
        <div className="h-screen">Loading</div>
      )}
    </div>
  );
}
