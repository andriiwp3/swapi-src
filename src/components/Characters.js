import { useEffect, useState } from "react";
import CharactersList from "./CharactersList";

export default function Characters({
  characters,
  filterOptions,
}) {
  const [filteredCharacters, setFilteredCharacters] = useState(characters);
  const { activeFilm, activeSpecies, filterMode, birthYear } = filterOptions;
  const { minBirthYear, maxBirthYear } = birthYear;

  useEffect(() => {
    filterCharacters();
  }, [activeFilm, activeSpecies, filterMode, characters, minBirthYear, maxBirthYear]);

  const filterCharacters = () => {
    const checkForAFilm = activeFilm !== "all";
    const checkForASpecies = activeSpecies !== "all";

    if (filterMode === "AND") {
      const filteredByFilm = checkForAFilm
        ? characters.filter((char) => char.films.includes(activeFilm))
        : characters;
      const filteredBySpecies = checkForASpecies
        ? filteredByFilm.filter((char) => char.species.includes(activeSpecies))
        : filteredByFilm;
      const filteredByBirthYear = filteredBySpecies.filter((char) => {
			return char.birth_year === 'unknown' || (char.birth_year >= minBirthYear && char.birth_year <= maxBirthYear)
		});

      return setFilteredCharacters(filteredByBirthYear);
    } else {
      const filteredByFilm = checkForAFilm
        ? characters.filter((char) => char.films.includes(activeFilm))
        : characters;
      const filteredBySpecies = checkForASpecies
        ? characters.filter((char) => char.species.includes(activeSpecies))
        : filteredByFilm;

      const array = [...filteredByFilm, ...filteredBySpecies];
      return setFilteredCharacters([...new Set(array)]);
    }
  };

  return (
	<CharactersList characters={filteredCharacters} />
  );
}
