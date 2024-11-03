"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
//import blob from "/images/blob.svg";

//font awesome du cul
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

export default function GameCard({ game }) {
  const startColor = "#0491d7"; // bleu
  const endColor = "#d70404"; // rouge
  const [showAllDesigners, setShowAllDesigners] = useState(false);
  const [showAllArtists, setShowAllArtists] = useState(false);

  //interpolation pour avoir une couleur qui est entre le rouge et le bleu
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

  const handleToggleDesigners = () => {
    setShowAllDesigners(!showAllDesigners);
  };

  const handleToggleArtists = () => {
    setShowAllArtists(!showAllArtists);
  };

  return (
    <div key={game.geekId} className="p-4 mb-4 ">
      <Tilt className="h-full" tiltAxis="y" scale={1.1} transitionSpeed={2500}>
        <div className="flex flex-col group border-2 border-amber-600 h-full mb-0 rounded-xl bg-gradient-to-r from-yellow-300 to-stone-200  shadow-lg hover:shadow-lg hover:shadow-amber-800 hover:border-amber-800 ">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col m-3">
              <div className="flex flex-row mb-5 items-center">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faPuzzlePiece} size="2x" />
                </div>
                <ul>
                  {game.designersLinks.length === 0 ? (
                    <>
                      <li
                        key={`${game.geekId} + noDesigner + ${game.name}`}
                        className="text-xl text-gray-500 ml-2"
                      >
                        (Uncredited)
                      </li>
                    </>
                  ) : game.designersLinks.length > 2 && !showAllDesigners ? (
                    <>
                      {game.designersLinks.slice(0, 2).map((designer) => (
                        <li
                          key={`${game.geekId} + ${designer.id} + ${game.name}`}
                          className="text-xl text-gray-500 ml-2"
                        >
                          {designer.value}
                        </li>
                      ))}
                      <button
                        onClick={handleToggleDesigners}
                        className="text-blue-500 underline ml-2 cursor-pointer"
                      >
                        ...
                      </button>
                    </>
                  ) : (
                    <>
                      {game.designersLinks.map((designer) => (
                        <li
                          key={`${game.geekId} + ${designer.id} + ${game.name}`}
                          className="text-xl text-gray-500 ml-2"
                        >
                          {designer.value}
                        </li>
                      ))}
                      {/*Si on a plus de 2 designers, on affiche un bouton pour réduire la liste. Si on a moins de 2 designers, la condition suivante n'est pas évaluée et pas rendue. Donc, pas de boutton "Réduire"*/}
                      {game.designersLinks.length > 2 && (
                        <button
                          onClick={handleToggleDesigners}
                          className="text-blue-500 underline ml-2 cursor-pointer"
                        >
                          Réduire
                        </button>
                      )}
                    </>
                  )}
                </ul>
              </div>
              <div className="flex flex-row items-center mb-2">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faPalette} size="2x" />
                  <ul>
                    {game.artistsLinks.length === 0 ? (
                      <>
                        <li
                          key={`${game.geekId} + noArtist + ${game.name}`}
                          className="text-xl text-gray-500 ml-2"
                        >
                          (Uncredited)
                        </li>
                      </>
                    ) : game.artistsLinks.length > 2 && !showAllArtists ? (
                      <>
                        {game.artistsLinks.slice(0, 2).map((artist) => (
                          <li
                            key={`${game.geekId} + ${artist.id} + ${game.name}`}
                            className="text-xl text-gray-500 ml-2"
                          >
                            {artist.value}
                          </li>
                        ))}
                        <button
                          onClick={handleToggleArtists}
                          className="text-blue-500 underline ml-2 cursor-pointer"
                        >
                          ...
                        </button>
                      </>
                    ) : (
                      <>
                        {game.artistsLinks.map((artist) => (
                          <li
                            key={`${game.geekId} + ${artist.id} + ${game.name}`}
                            className="text-xl text-gray-500 ml-2"
                          >
                            {artist.value}
                          </li>
                        ))}
                        {game.artistsLinks.length > 2 && (
                          <button
                            onClick={handleToggleArtists}
                            className="text-blue-500 underline ml-2 cursor-pointer"
                          >
                            Réduire
                          </button>
                        )}
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative pr-2 py-2 w-[112px] h-[112px] ">
              <Image
                className="absolute top-0 "
                src="/images/blob.svg"
                alt="blob"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
              <h1 className="absolute top-0 pt-11 pl-11">
                {Math.round(game.geekAverage * 100) / 100}
              </h1>
            </div>
          </div>
          <div className="overflow-hidden   bg-gradient-to-r  from-yellow-100 to-stone-300">
            <Link href={`/games/${game.geekId}`}>
              {game.image !== undefined ? (
                <Image
                  className="py-2 rounded-2xl lg:h-48 md:h-36 w-full object-contain object-center scale-125 transition-all duration-500 ease-in-out group-hover:scale-100 hover:cursor-pointer"
                  src={game.image}
                  alt={game.name}
                  width={200}
                  height={200}
                />
              ) : (
                <Image
                  className="py-2 rounded-2xl lg:h-48 md:h-36 w-full object-contain object-center scale-125 transition-all duration-500 ease-in-out group-hover:scale-100 hover:cursor-pointer"
                  src="/images/lolotest.jpg"
                  alt="Inconnue"
                  width={200}
                  height={200}
                />
              )}
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
                  key={`${game.geekId} + ${category.id} + ${game.name}`}
                  className="font-category text-center text-2xl text-gray-500"
                >
                  {category.value}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center flex-wrap mb-1 px-3">
            <div className="flex flex-col">
              <FontAwesomeIcon icon={faUsers} size="2x" className="mb-1" />
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
              <FontAwesomeIcon icon={faGear} size="2x" className="mb-1" />

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
}
