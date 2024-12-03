"use client";

import { useEffect, useState } from "react";

import GameCard from "./components/GameCard";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [arenaGamesData, setArenaGamesData] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    // Appeler l'API route pour récupérer les données JSON.
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setArenaGamesData(data);
        setFilteredGames(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  const handleSearch = (searchValue) => {
    if (searchValue === "") {
      setFilteredGames(arenaGamesData);
    } else {
      const filtered = arenaGamesData.filter((game) => {
        const nameMatch = game.name
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        const artistMatch =
          game.artistsLinks &&
          game.artistsLinks.some((artist) =>
            artist.value.toLowerCase().includes(searchValue.toLowerCase())
          );

        const designerMatch =
          game.designersLinks &&
          game.designersLinks.some((designer) =>
            designer.value.toLowerCase().includes(searchValue.toLowerCase())
          );

        return nameMatch || artistMatch || designerMatch;
      });
      setFilteredGames(filtered);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {filteredGames.length > 0 ? (
        <div className="p-5 grid lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-2  gap-y-5">
          {filteredGames.map((game) => (
            <GameCard key={`${game.geekId} + ${game.name}`} game={game} />
          ))}
        </div>
      ) : (
        <div className="h-screen">Loading</div>
      )}
    </div>
  );
}
