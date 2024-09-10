import { promises as fs } from "fs";
import Image from "next/image";

export default async function Home() {
  const arenaGameData = JSON.parse(
    await fs.readFile(
      // J'utilise process.cwd() pour obtenir le chemin absolu du répertoire racine du projet, comme indiqué dans la doc de vercel
      process.cwd() + "/src/app/data/arena-games-data.json",
      "utf8"
    )
  );

  return (
    <div className="p-5 text-gray-600 grid lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-2 ">
      {arenaGameData.map((game) => (
        <div key={game.geekId} className="p-4 mb-4 ">
          <div className="flex flex-col group border-2 border-amber-600 h-full pt-6 rounded-xl bg-gradient-to-r from-yellow-300 to-stone-200  shadow-lg hover:shadow-lg hover:shadow-amber-800 hover:scale-110 transition-all duration-200 ease-in-out">
            <div className="overflow-hidden   bg-gradient-to-r  from-yellow-100 to-stone-300">
              <Image
                className="py-2 rounded-2xl lg:h-48 md:h-36 w-full object-contain object-center scale-125 transition-all duration-300 ease-in-out group-hover:scale-100"
                src={game.image}
                alt={game.name}
                width={200}
                height={200}
              />
            </div>
            <div className="p-6 flex-grow">
              <h2 className="tracking-widest text-xs font-medium text-gray-400 mb-1">
                Année?
              </h2>
              <h1 className="font-title text-3xl  text-center font-medium text-gray-600 mb-3">
                {game.name}
              </h1>
              <ul className="leading-relaxed mb-3">
                {game.gameCategoryLinks.map((category) => (
                  <li key={game.geekID} className="text-center">
                    {category.value}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between flex-wrap mb-4 ">
              <div>{`${game.minPlayers} to ${game.maxPlayers} players`}</div>
              <button className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md px-4 py-1 rounded-lg">
                Learn more
              </button>
              <div>complexity</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
