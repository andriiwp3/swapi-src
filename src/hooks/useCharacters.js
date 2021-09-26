import { useEffect, useState } from "react";
import { charactersAPI } from "../api/api";

export default function useCharacters() {
  const [characters, setCharacters] = useState([]);
  const [next, setNext] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCharacters();
  }, [next]);

  const getCharacters = async () => {
    const data = await charactersAPI.getCharacters(next);
    if (!data) return false;
    if (!count) setCount(data.count);

    const results = convertBirthYear(data.results);

    results && setCharacters([...characters, ...results]);
    data.next && setNext(data.next);
    return true;
  };

  const convertBirthYear = (characters) => {
    return characters.map((char) => {
      if (char["birth_year"].includes("BBY")) {
        const convertedValue = char["birth_year"].split("BBY");
        convertedValue.unshift("-");
        return {
          ...char,
          birth_year: +convertedValue.join(""),
        };
      } else if (char["birth_year"].includes("ABY")) {
        return {
          ...char,
          birth_year: +char["birth_year"].split("ABY").join(""),
        };
      } else {
        return {
          ...char,
        };
      }
    });
  };

  return count === characters.length ? characters : [];
}
