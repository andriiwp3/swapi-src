import { Link } from "react-router-dom";

export default function CharactersList({ characters, className }) {
  return (
    <ul className={className}>
      {characters.length
        ? characters.map((char) => (
            <li
              key={char.url}
              className="italic mb-1 _list-item"
            >
              <Link
                to={`/character/${char.name.replace(/\s/g, "")}?url=${
                  char.url
                }`}
                className="text-blue-500 font-medium"
              >
                {`— ${char.name}`}
              </Link>
            </li>
          ))
        : "There are no characters"}
    </ul>
  );
}
