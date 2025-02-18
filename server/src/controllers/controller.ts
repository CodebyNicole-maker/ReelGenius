import axios from "axios";

const apiKey = process.env.OMDB_API_KEY;

const search = async (query: string) =>
  axios.get(`http://www.omdbapi.com/?${apiKey}=trilogy&t=${query}`);

export default { search };
