import { useEffect, useState } from "react";
import { dataAPI } from "../api/api";

export default function useStarships() {
  const [starships, setStarships] = useState([]);
  const [next, setNext] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    getStarships();
  }, [next]);

  const getStarships = async () => {
    const data = await dataAPI.getStarships(next);
    if (!data || !data.results) return false;
    if (!count) setCount(data.count);

    const filteredStarships = data.results.map(({ name, url }) => ({
      name,
      url,
    }));
    setStarships([...starships, ...filteredStarships]);
    return data.next && setNext(data.next);
  };

  return count === starships.length ? starships : [];
}
