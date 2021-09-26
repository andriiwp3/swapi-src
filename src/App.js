import { Route, Switch, useLocation } from "react-router";
import useCharacters from "./hooks/useCharacters";
import useSpecies from "./hooks/useSpecies";
import useFilms from "./hooks/useFilms";
import Home from "./pages";
import Character from "./pages/character";
import useStarships from "./hooks/useStarships";
import { useState } from "react";
import CharactersList from "./components/CharactersList";

function App() {
  const [favorites, setFavorites] = useState([]);

  const characters = useCharacters();
  const species = useSpecies();
  const films = useFilms();
  const starships = useStarships();

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  if (
    !characters.length ||
    !species.length ||
    !films.length ||
    !starships.length
  )
    return "Loading...";
  return (
    <div className="wrapper flex items-stretch flex-col md:flex-row">
      <aside className="w-full md:w-1/5 min-w-250 p-4 border-b-2 md:border-b-0 md:border-r-2 _aside">
        <div className="aside__container">
          <h2 className="text-2xl font-bold">Favorites</h2>

          <CharactersList
            characters={favorites}
            className="_favorites-list"
          />
        </div>
      </aside>
      <Switch>
        <Route path="/" exact={true}>
          <Home characters={characters} species={species} films={films} />
        </Route>
        <Route path="/character/:name" exact={true}>
          <Character
            url={query.get("url")}
            species={species}
            films={films}
            starships={starships}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
