import axios from "axios";
import

const search = async (query) =>
  axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${query}&rating=pg`);

export default { search };


const searchOMDB = async (query: string) => {
  try {
    console.log(import.meta.env.VITE_OMDB_API_KEY);
    const response = await fetch(
      `https://www.omdbapi.com/?t=${query}&apikey=${
        import.meta.env.VITE_OMDB_API_KEY
      }`
    );
    console.log('Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log('an error occurred', err);
    return [];
  }
};

export { searchOMDB };
