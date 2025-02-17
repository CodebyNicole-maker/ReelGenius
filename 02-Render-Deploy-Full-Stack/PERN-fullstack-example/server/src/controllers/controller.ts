import axios from "axios";

const apiKey = process.env.TMDB_API_KEY;

const search = async (query) =>
  axios.get(`https://api.themoviedb.org/3?apikey=trilogy&t=${query}&rating=pg`);

export default { search };
