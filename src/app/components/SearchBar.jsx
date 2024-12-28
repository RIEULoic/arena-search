import { useState } from "react";
import { Dropdown, ToggleSwitch, Checkbox } from "flowbite-react";

export default function SearchBar({
  onSearch,
  isLoading,
  onToggleSortOrder,
  onTogglePlayersCheckbox,
  isAlphaSort,
  playerFilters,
}) {
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const triggerSearch = () => {
    onSearch(localSearchTerm);
  };

  return (
    <div className=" w-full fixed bg-gray-300 h-60 z-50">
      <div className="flex items-center justify-around p-5">
        <div className="flex gap-1">
          <input
            type="text"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                triggerSearch();
              }
            }}
            className="border-2 border-gray-300 bg-white h-10 w-[500px] px-5 pr-16 rounded-lg text-sm focus:scale-110 focus:outline-none duration-300"
            placeholder="Search a game, a designer, or an artist"
          />
          <div className="w-5"></div>
          <button
            className="bg-blue-500 border-2 border-blue-400  hover:bg-blue-700 hover:scale-110 h-10 py-2 px-4 rounded-lg duration-300"
            onClick={triggerSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="fill-white"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </button>
        </div>
        <div className=" flex">
          <label className="flex items-center  text-xl gap-2">
            <ToggleSwitch checked={isAlphaSort} onChange={onToggleSortOrder} />
            Listed by alphabetical order
          </label>
          <label className="flex items-center ml-6 text-xl gap-2">
            <input
              type="checkbox"
              checked={!isAlphaSort}
              onChange={onToggleSortOrder}
              className="w-8 h-8"
            />
            Listed by rank
          </label>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="ml-6">
          <Dropdown label="Number of players" dismissOnClick={false}>
            {/* dismissOnClick={false} empèche le comportement par défaut de flowbite qui ferme le dropdown*/}
            {["solo", 2, 3, 4, 5, 6, "7+"].map((playerId) => (
              <Dropdown.Item
                key={playerId}
                onClick={() => onTogglePlayersCheckbox(playerId)}
                className="cursor-pointer"
              >
                <Checkbox
                  id={playerId}
                  className="cursor-pointer mr-2 w-6 h-6"
                  checked={playerFilters.includes(playerId)}
                  readOnly // je met readOnly pour éviter l'erreur de console. En effet c'est togglePlayerFilter qui gère le changement de l'état de la checkbox.
                />
                {playerId}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
        <div className="ml-6">
          <Dropdown label="Dropdown button">
            <Dropdown.Item></Dropdown.Item>
            <Dropdown.Item></Dropdown.Item>
            <Dropdown.Item></Dropdown.Item>
            <Dropdown.Item></Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex justify-center items-center  w-20">
          {isLoading ? (
            <div className="animate-spin h-20 w-20 ml-6 mt-6 border-y-4 rounded-full border-black"></div>
          ) : null}
        </div>
        <div className="ml-6">
          <Dropdown label="Dropdown button">
            <Dropdown.Item></Dropdown.Item>
            <Dropdown.Item></Dropdown.Item>
            <Dropdown.Item></Dropdown.Item>
            <Dropdown.Item></Dropdown.Item>
          </Dropdown>
        </div>
        <div className="ml-6">
          <Dropdown label="Dropdown button">
            <Dropdown.Item></Dropdown.Item>
            <Dropdown.Item></Dropdown.Item>
            <Dropdown.Item></Dropdown.Item>
            <Dropdown.Item></Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
