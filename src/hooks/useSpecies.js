import { useEffect, useState } from "react";
import { dataAPI } from "../api/api";

export default function useSpecies() {
  const [species, setSpecies] = useState([{ name: "All", url: "all" }]);
  const [next, setNext] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    getSpecies();
  }, [next]);

  const getSpecies = async () => {
    const data = await dataAPI.getSpecies(next);
    if (!data || !data.results) return false;
	 if(!count) setCount(data.count)

    const filteredSpecies = data.results.map(({ name, url }) => ({
      name,
      url,
    }));
    setSpecies([...species, ...filteredSpecies]);
    return data.next && setNext(data.next);
  };

  return count === species.length - 1 ? species : [];
}
