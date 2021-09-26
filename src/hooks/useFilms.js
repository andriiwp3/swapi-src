import { useEffect, useState } from "react";
import { dataAPI } from "../api/api";

export default function useFilms() {
  const [films, setFilms] = useState([
    { title: "All", episode_id: "all", url: "all" },
  ]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getFilms();
  }, []);

  const getFilms = async () => {
    const data = await dataAPI.getFilms();
    if (!data || !data.results) return false;
    if (!count) setCount(data.count);

    const filteredFilms = data.results
      .map(({ title, episode_id, url }) => ({
        title,
        episode_id,
        url,
      }))
      .sort((a, b) => (a.episode_id < b.episode_id ? -1 : 1));

    return setFilms([...films, ...filteredFilms]);
  };

  return count === films.length - 1 ? films : [];
}
