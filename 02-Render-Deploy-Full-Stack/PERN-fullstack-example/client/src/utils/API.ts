import axios from "axios";

const VITE_OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

// const url = "https://api.themoviedb.org/3/configuration";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
//   },
// };

const searchMovie = async (query: string) =>
  axios.get(`http://www.omdbapi.com/?apikey=${VITE_OMDB_API_KEY}&t=${query}`);

// export default { search };

// ----------------------------------------------------------- //

// const searchTMDB = async (query: string) => {
//   try {
//     console.log(import.meta.env.VITE_OMDB_API_KEY);
//     /* const response = await fetch(
//       `https://api.themoviedb.org/3?t=${query}&apikey=${
//         import.meta.env.VITE_TMDB_API_KEY
//       }`
//     ); */
//     const response = await fetch(
//       `http://www.omdbapi.com/?apikey=${
//         import.meta.env.VITE_OMDB_API_KEY
//       }&t=${query}
//       }`
//     );

//     if (!response.ok) {
//       throw new Error("invalid API response, check the network tab");
//     }
//     console.log("Response:", response);
//     const data = await response.json();
//     console.log("Data:", data);
//     return data;
//   } catch (err) {
//     console.log("an error occurred", err);
//     return [];
//   }
// };

export { searchMovie };
