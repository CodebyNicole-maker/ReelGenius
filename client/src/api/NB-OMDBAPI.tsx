import axios from "axios";
const VITE_OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const searchMovie = async (query: string) =>
  axios.get(`https://www.omdbapi.com/?apikey=${VITE_OMDB_API_KEY}&t=${query}`);
export { searchMovie };