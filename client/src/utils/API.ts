import axios from "axios";

const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const searchMovie = async (query: string) =>
  axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${VITE_TMDB_API_KEY}`
  );

const getRecommendations = async (movieID: string) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${VITE_TMDB_API_KEY}`
  );

const getMoviebyID = async (movieID: number | string) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${VITE_TMDB_API_KEY}`
  );

export { searchMovie, getRecommendations, getMoviebyID };

//! This is the original code that was in the API.ts file
// const VITE_OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
// const TMDB_API_ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_ACCESS_TOKEN;

// const url = "https://api.themoviedb.org/3/configuration";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
//   },
// };

// const searchMovie = async (query: string) =>
//   axios.get(`https://www.omdbapi.com/?apikey=${VITE_OMDB_API_KEY}&t=${query}`);

// // separate function for recommendations
// //api.themoviedb.org/3/movie/920/recommendations?language=en-US&page=1

// ----------------------------------------------------------//

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
//         import.meta.env.VITE_OMDB_API_KEY}&t=${query}
//       }`
//     );

// const getRecommendations = async () => {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/${movieID}/recommendations`,
//       {
//         method: "GET",
//         headers: {
//           authorization: `Bearer ${TMDB_API_ACCESS_TOKEN}`,
//           "content-type": "application/json",
//         },
//       }
//     );
//     if (!response.ok) {
//       throw new Error("invalid API response, check the network tab");
//     }
//     const data = response.json();
//     return data;
//   } catch (error) {
//     console.log("an error occurred", error);
//     return [];
//   }
// };

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

// export const search = (query: string): Promise<{ data: string }> => {
//   return fetch(`https://www.omdbapi.com/?t=${query}&apikey=yourapikey`)
//     .then((response) => response.json())
//     .then((data) => ({ data }));
// };
