import { useEffect, useState } from "react";
import { charactersAPI } from "../api/api";

export default function Character({ url, species, films, starships }) {
  const [character, setCharacter] = useState({});
  const [extractedFilms, setFilms] = useState([]);
  const [extractedSpecies, setSpecies] = useState([]);
  const [extractedStarships, setStarships] = useState([]);

  useEffect(() => {
    getCharacter();
  }, [url]);

  useEffect(() => {
    const filteredFilms = films?.filter((film) =>
      character.films?.includes(film.url)
    );
    setFilms(filteredFilms);
  }, [character.films, films]);

  useEffect(() => {
    const filteredSpecies = species?.filter((species) =>
      character.species?.includes(species.url)
    );
    setSpecies(filteredSpecies);
  }, [character.species, species]);

  useEffect(() => {
    const filteredStarships = starships?.filter((starship) =>
      character.starships?.includes(starship.url)
    );
    setStarships(filteredStarships);
  }, [character.starships, starships]);

  const getCharacter = async () => {
    if (character.url !== url) {
      const data = await charactersAPI.getCharacter(url);
      setCharacter(data);
    }
  };
  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {character?.name || ""}
            </h1>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2">
			 {extractedFilms?.length ? (
				<div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Films</h3>
              <div className="mt-4">
                <ul className="pl-4 list-disc text-sm space-y-2">
                  {extractedFilms?.map((film) => (
                    <li key={film.title} className="text-gray-400">
                      <span className="text-gray-600">{film.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>) : ''}

				{extractedSpecies?.length ? (
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Species</h3>
              <div className="mt-4">
                <ul className="pl-4 list-disc text-sm space-y-2">
                  {extractedSpecies?.map((species) => (
                    <li key={species.name} className="text-gray-400">
                      <span className="text-gray-600">{species.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>) : ''}

				{extractedStarships?.length ? (
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Starships</h3>
              <div className="mt-4">
                <ul className="pl-4 list-disc text-sm space-y-2">
                  {extractedStarships?.map((starship) => (
                    <li key={starship.name} className="text-gray-400">
                      <span className="text-gray-600">{starship.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>) : ''}
				
          </div>
        </div>
      </div>
    </div>
  );
}
