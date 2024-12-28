"use client";

import { useEffect, useState } from "react";

import GameCard from "./components/GameCard";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [allGames, setAllGames] = useState([]);
  const [filteredGamesList, setFilteredGamesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlphaSort, setIsAlphaSort] = useState(true);
  const [playerFilters, setPlayerFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Appeler l'API route pour récupérer les données JSON.
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setAllGames(data);
        setFilteredGamesList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  useEffect(() => {
    if (allGames.length === 0) return;
    //Si allGames est vide, on ne fait rien. Cela évite de lancer le useEffect avant que les données soient récupérées et d'avoir "no games found" affiché à l'écran.
    setIsLoading(true);
    let result = [...allGames];
    //On crée une copie de l'array pour ne pas modifier l'array original (bonne pratique en React)
    if (searchTerm.trim() !== "") {
      const searchValueLowerCase = searchTerm.toLowerCase();
      result = result.filter((game) => {
        const nameMatch = game.name
          .toLowerCase()
          .includes(searchValueLowerCase);
        const artistMatch =
          game.artistsLinks &&
          game.artistsLinks.some((artist) =>
            artist.value.toLowerCase().includes(searchValueLowerCase)
          );
        const designerMatch =
          game.designersLinks &&
          game.designersLinks.some((designer) =>
            designer.value.toLowerCase().includes(searchValueLowerCase)
          );

        return nameMatch || artistMatch || designerMatch;
      });
    }

    if (playerFilters.length > 0) {
      result = result.filter((game) => {
        return playerFilters.every((playerId) => {
          if (playerId === "solo") {
            return game.minPlayers <= 1 && game.maxPlayers >= 1;
          }
          if (playerId === "7+") {
            return game.minPlayers <= 7 && game.maxPlayers >= 7;
          } else {
            return game.minPlayers <= playerId && game.maxPlayers >= playerId;
          }
        });
      });
    }

    if (isAlphaSort) {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => b.geekAverage - a.geekAverage);
    }

    setFilteredGamesList(result);
    setIsLoading(false);
  }, [searchTerm, playerFilters, isAlphaSort, allGames]);

  const togglePlayerFilter = (playerId) => {
    setPlayerFilters((prev) => {
      if (prev.includes(playerId)) {
        return prev.filter((item) => item !== playerId);
      } else {
        return [...prev, playerId];
      }
    });
  };

  const updateSearchTerm = (terms) => {
    setSearchTerm(terms);
  };

  const toggleSortOrder = () => {
    setIsAlphaSort((prev) => !prev);
  };

  return (
    <div>
      <SearchBar
        onSearch={updateSearchTerm}
        isLoading={isLoading}
        onToggleSortOrder={toggleSortOrder}
        isAlphaSort={isAlphaSort}
        playerFilters={playerFilters}
        onTogglePlayersCheckbox={togglePlayerFilter}
      />
      {filteredGamesList.length > 0 ? (
        <div className=" pt-60 px-4 grid lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-2  gap-y-5">
          {filteredGamesList.map((game) => (
            <GameCard key={game.geekId} game={game} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center  h-screen pt-96 animate-pulse text-8xl text-orange-950 font-bold ">
          {isLoading ? "Be patient..." : "No results found"}
        </div>
      )}
    </div>
  );
}
