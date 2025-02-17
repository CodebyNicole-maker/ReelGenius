import axios from "axios";
const OMDB_API_KEY = import.meta.env.OMDB_API_KEY;
const searchMovie = async (query: string) =>
  axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${query}`);
export { searchMovie };