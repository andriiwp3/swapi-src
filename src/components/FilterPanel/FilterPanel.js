import BirthDateRange from "./BirthDateRange";
import FilmsSelect from "./FilmsSelect";
import SpeciesSelect from "./SpeciesSelect";

export default function FilterPanel({
  species,
  films,
  birthYears,
  filmFilterOptions,
  speciesFilterOptions,
  birthYearsOptions,
  filterModeOptions,
}) {
  const { activeFilm, setActiveFilm } = filmFilterOptions;
  const { activeSpecies, setActiveSpecies } = speciesFilterOptions;
  const { filterMode, toggleFilterMode } = filterModeOptions;
  const { min, max, bounds } = birthYearsOptions;
  const handleFilterTogglerClick = () => {
    filterMode === "AND" ? toggleFilterMode("OR") : toggleFilterMode("AND");
  };

  return (
    <div className="flex items-center flex-col">
      <div className="w-full flex items-center mb-3 flex-col md:flex-row">
        <div className="w-full mb-3 md:mb-0 md:mr-6 flex-1">
          <FilmsSelect
            films={films}
            activeFilm={activeFilm}
            setActiveFilm={setActiveFilm}
          />
        </div>
        <div className="w-full mb-3 md:mb-0 md:mr-6 flex-1">
          <SpeciesSelect
            species={species}
            activeSpecies={activeSpecies}
            setActiveSpecies={setActiveSpecies}
          />
        </div>
        <div className="w-full mb-3 md:mb-0 md:mr-6 flex-1">
          <BirthDateRange
            min={bounds?.min}
            max={bounds?.max}
            minValue={min?.birthYear}
            maxValue={max?.birthYear}
            setMinValue={min?.setBirthYear}
            setMaxValue={max?.setBirthYear}
          />
        </div>
      </div>

      <div className="whitespace-nowrap flex flex-col">
        <p>Current filter mode: {filterMode}</p>
        <button
          type="submit"
          className="bg-blue-500 rounded-md py-2 text-gray-50 text-xs font-bold"
          onClick={handleFilterTogglerClick}
        >
          Toggle filter mode
        </button>
      </div>
    </div>
  );
}
