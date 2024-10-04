"use client";

import Tilt from "react-parallax-tilt";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

//font awesome du cul
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

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

  //interpolation
  function interpolateColor(startColor, endColor, value, max) {
    const start = parseInt(startColor.slice(1), 16); // Convertit la couleur hexadécimale en entier
    const end = parseInt(endColor.slice(1), 16);

    // Interpoler chaque composant (rouge, vert, bleu)
    const r = Math.floor(
      ((end >> 16) - (start >> 16)) * (value / max) + (start >> 16)
    );
    const g = Math.floor(
      (((end >> 8) & 0xff) - ((start >> 8) & 0xff)) * (value / max) +
        ((start >> 8) & 0xff)
    );
    const b = Math.floor(
      ((end & 0xff) - (start & 0xff)) * (value / max) + (start & 0xff)
    );

    // Retourner la couleur sous forme hexadécimale
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  return (
    <div>
      {arenaGamesData.length > 0 ? (
        <div className="p-5 grid lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-2 ">
          {arenaGamesData.map((game) => {
            const startColor = "#0491d7"; // bleu
            const endColor = "#d70404"; // rouge
            return (
              <div key={game.geekId} className="p-4 mb-4 ">
                <Tilt
                  className="h-full"
                  tiltAxis="y"
                  scale={1.1}
                  transitionSpeed={2500}
                >
                  <div className="flex flex-col group border-2 border-amber-600 h-full  rounded-xl bg-gradient-to-r from-yellow-300 to-stone-200  shadow-lg hover:shadow-lg hover:shadow-amber-800 hover:border-amber-800 ">
                    <div>
                      <h1 className="text-end pr-2 py-2">
                        {Math.round(game.geekAverage * 100) / 100}
                      </h1>
                    </div>
                    <div className="overflow-hidden   bg-gradient-to-r  from-yellow-100 to-stone-300">
                      <Link href={`/games/${game.geekId}`}>
                        <Image
                          className="py-2 rounded-2xl lg:h-48 md:h-36 w-full object-contain object-center scale-125 transition-all duration-500 ease-in-out group-hover:scale-100 hover:cursor-pointer"
                          src={game.image}
                          alt={game.name}
                          width={200}
                          height={200}
                        />
                      </Link>
                    </div>
                    <div className="p-6 flex-grow">
                      <h2 className="tracking-widest text-xs font-medium text-gray-500 mb-1">
                        Année?
                      </h2>
                      <h1 className="font-title text-3xl  text-center font-medium text-zinc-700 mb-3">
                        {game.name}
                      </h1>
                      <ul className="mt-6">
                        {game.gameCategoryLinks.map((category) => (
                          <li
                            key={game.geekId + category.id}
                            className="font-category text-center text-2xl text-gray-500"
                          >
                            {category.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center flex-wrap mb-1 px-3">
                      <div className="flex flex-col">
                        <FontAwesomeIcon
                          icon={faUsers}
                          size="2x"
                          className="mb-1"
                        />
                        {game.minPlayers === game.maxPlayers ? (
                          <div className="flex justify-center text-xl ">
                            {game.minPlayers}
                          </div>
                        ) : (
                          <div className="flex justify-center text-xl">{`${game.minPlayers} - ${game.maxPlayers}`}</div>
                        )}
                      </div>
                      <Link href={`/games/${game.geekId}`}>
                        <button className="text-xl text-gray-700 bg-gradient-to-r from-slate-400 to-stone-200 hover:scale-110 transition-all duration-200 ease-in-out drop-shadow-xl px-4 py-1 rounded-xl border-2 border-blue-400">
                          Learn more
                        </button>
                      </Link>
                      <div className="flex flex-col">
                        <FontAwesomeIcon
                          icon={faGear}
                          size="2x"
                          className="mb-1"
                        />

                        {/*Interpolation de la couleur en fonction de la complexité du jeu */}
                        <div
                          className="flex justify-center font-black text-xl "
                          style={{
                            color: interpolateColor(
                              startColor,
                              endColor,
                              Math.round(game.geekComplexity * 100) / 100,
                              //Petite formule pour arrondir à 2 chiffres après la virgule
                              5
                            ),
                            filter: "contrast(300%)",
                            //avec React, lorsque tu utilises un inline style, tu dois mettre les valeurs en string
                            filter: "brightness(1.5)",
                          }}
                        >
                          {Math.round(game.geekComplexity * 100) / 100}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-screen">Loading</div>
      )}
    </div>
  );
}
