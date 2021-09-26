import { useState } from "react";
import Characters from "../components/Characters";
import FilterPanel from "../components/FilterPanel/FilterPanel";

export default function Home({ characters, species, films }) {
  const [activeFilm, setActiveFilm] = useState("all");
  const [activeSpecies, setActiveSpecies] = useState("all");
  const [filterMode, toggleFilterMode] = useState("AND");
  const birthYears = characters.map((char) => char.birth_year);

  const getMinYear = (years) => {
    return years?.reduce((prev, current) => {
      return +current < +prev ? +current : +prev;
    }, 0);
  };
  const getMaxYear = (years) => {
    return years?.reduce((prev, current) => {
      return +current > +prev ? +current : +prev;
    }, getMinYear(years));
  };

  const minYear = getMinYear(birthYears);
  const maxYear = getMaxYear(birthYears);

  const [minBirthYear, setMinBirthYear] = useState(minYear);
  const [maxBirthYear, setMaxBirthYear] = useState(maxYear);

  return (
    <div className="w-full md:w-3/4 flex flex-col py-4 px-12">
      <div className="mb-8">
        <FilterPanel
          filmFilterOptions={{ activeFilm, setActiveFilm }}
          speciesFilterOptions={{ activeSpecies, setActiveSpecies }}
          filterModeOptions={{ filterMode, toggleFilterMode }}
          birthYearsOptions={{
            min: { birthYear: minBirthYear, setBirthYear: setMinBirthYear },
            max: { birthYear: maxBirthYear, setBirthYear: setMaxBirthYear },
            bounds: { min: minYear, max: maxYear },
          }}
          species={species}
          films={films}
          birthYears={birthYears}
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">Characters List</h1>
      <Characters
        characters={characters}
        filterOptions={{
          activeFilm,
          activeSpecies,
          filterMode,
          birthYear: { minBirthYear, maxBirthYear },
        }}
      />
    </div>
  );
}
