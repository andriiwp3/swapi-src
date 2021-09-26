import axios from "axios";
import { BASE_URL } from "../constants/data";

const instance = axios.create({
  baseURL: BASE_URL,
});

export const charactersAPI = {
  async getCharacters(url = `${BASE_URL}/people`) {
    return await instance
      .get(url)
      .then((response) => response.data)
      .catch((error) => undefined);
  },
  async getCharacter(url) {
	  if (!url) return false
	  return await instance.get(url).then(response => response.data).catch(error => undefined)
  }
};

export const dataAPI = {
  async getSpecies(url = `${BASE_URL}/species`) {
    return await instance
      .get(url)
      .then((response) => response.data)
      .catch((error) => undefined);
  },
  async getFilms() {
    return await instance
      .get("/films")
      .then((response) => response.data)
      .catch((error) => undefined);
  },
  async getStarships(url = `${BASE_URL}/starships`) {
    return await instance
      .get(url)
      .then((response) => response.data)
      .catch((error) => undefined);
  },
};
