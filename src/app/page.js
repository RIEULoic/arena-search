"use client";

import { useEffect, useState } from "react";

import GameCard from "./components/GameCard";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [arenaGamesData, setArenaGamesData] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAlphaBoxChecked, setIsAlphaBoxChecked] = useState(true);

  useEffect(() => {
    // Appeler l'API route pour récupérer les données JSON.
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setArenaGamesData(data);
        setFilteredGames(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  //j'ai rajouté un setTimeout pour simuler un délai de chargement sinon les useStates ne sont pas mis à jour correctement j'ai l'impression.
  //Ce n'est pas du tout une bonne pratique en PROD, mais je n'ai pas trouvé d'autres solutions pour le moment.
  const handleSearch = (searchValue) => {
    setLoading(true);
    setTimeout(() => {
      let filtered;
      if (searchValue === "") {
        filtered = arenaGamesData; // Si la recherche est vide, on affiche tous les jeux
      } else {
        filtered = arenaGamesData.filter((game) => {
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
      }
      sortBy(isAlphaBoxChecked, filtered);
      setLoading(false);
    }, 0); // Simule un délai pour afficher le "loading"
  };

  // const sortBy = (isAlphaBoxChecked) => {
  //   setLoading(true);
  //   //Pareil, j'ai rajouté un setTimeout pour simuler un délai de chargement sinon les useStates ne sont pas mis à jour correctement j'ai l'impression.
  //   setTimeout(() => {
  //     isAlphaBoxChecked
  //       ? setFilteredGames((prev) =>
  //           [...prev].sort((a, b) => a.name.localeCompare(b.name))
  //         )
  //       : setFilteredGames((prev) =>
  //           [...prev].sort((a, b) => b.geekAverage - a.geekAverage)
  //         );
  //     setLoading(false);
  //   }, 0);
  // };

  const sortBy = (isAlpha, games = filteredGames) => {
    setLoading(true);
    setTimeout(() => {
      const sortedGames = [...games].sort(
        (a, b) =>
          isAlpha
            ? a.name.localeCompare(b.name) // Tri alphabétique
            : b.geekAverage - a.geekAverage // Tri par rank décroissant
      );
      setFilteredGames(sortedGames);
      setLoading(false);
    }, 0);
  };

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        loading={loading}
        sortBy={() => {
          const newAlphaChecked = !isAlphaBoxChecked;
          setIsAlphaBoxChecked(newAlphaChecked);
          sortBy(newAlphaChecked);
        }}
        isAlphaBoxChecked={isAlphaBoxChecked}
      />
      {filteredGames.length > 0 ? (
        <div className=" pt-96 px-4 grid lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-2  gap-y-5">
          {filteredGames.map((game) => (
            <GameCard key={game.geekId} game={game} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center  h-screen pt-96 animate-pulse text-8xl text-orange-950 font-bold ">
          {loading ? "Be patient..." : "No results found"}
        </div>
      )}
    </div>
  );
}
