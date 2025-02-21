import { useState, useEffect } from "react";
import { searchMovie, getRecommendations, getMoviebyID } from "../utils/API";
import SearchForm from "./SearchForm";
import auth from "../utils/auth";
import "../styles/OMDBcontainer.css";
import favs from "./favs";

import type { UserData } from "../interfaces/UserData";

console.log(getRecommendations);
console.log(searchMovie);
console.log(getMoviebyID);
//Todo: edit following code to only store the movie and the following movie details
// ? this will be used in favorites caurosel and movie modal
// ! - Title - Poster - Genre - MovieID - Plot - Director - Actors - Released - Runtime - Rating - Votes - BoxOffice - Production - Website
// ? Not

function OmdbContainer() {
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  interface Movie {
    Title: string;
    Poster: string;
    Genre: string;
    Plot: string;
    Released: string;
    MovieID: string;
  }

  interface Recommendation {
    Title: string;
    Poster: string;
    MovieID: string;
  }

  const [movie, setMovie] = useState<Movie | null>(null);
  // State to store movie detail
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  // State to store recommendations

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.loggedIn()) {
        try {
          const userData = auth.getProfile();
          setUser({
            id: userData.id ?? null,
            username: userData.username ?? "Guest",
            email: userData.email ?? null,
            favorite_movies: userData.favorite_movies || [],
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  console.log("THIS USER AAAAAAAAAAAAAAA", user?.id);

  const handleFormSubmit = async (query: string) => {
    try {
      const result = await searchMovie(query);
      console.log("Fetched Data:", result);

      if (result.data.results.length > 0) {
        const movieDetails = result.data.results[0]; // Get first movie from search results

        const genreMap: { [key: number]: string } = {
          28: "Action",
          12: "Adventure",
          16: "Animation",
          35: "Comedy",
          80: "Crime",
          99: "Documentary",
          18: "Drama",
          10751: "Family",
          14: "Fantasy",
          36: "History",
          27: "Horror",
          10402: "Music",
          9648: "Mystery",
          10749: "Romance",
          878: "Science Fiction",
          10770: "TV Movie",
          53: "Thriller",
          10752: "War",
          37: "Western",
        };

        const movieData: Movie = {
          Title: movieDetails.title,

          Poster: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`, // Construct full image URL
          Genre: movieDetails.genre_ids
            .map((id: number) => genreMap[id] || "Unknown")
            .join(", "), // Convert genre array to a string

          Plot: movieDetails.overview,
          Released: movieDetails.release_date,

          MovieID: movieDetails.id.toString(), // Store the movie ID
        };

        setMovie(movieData);

        const recommendationsResult = await getRecommendations(
          movieData.MovieID
        );
        console.log("Recommendations Data:", recommendationsResult);

        if (recommendationsResult.data.results.length > 0) {
          const recommendationList = recommendationsResult.data.results
            .slice(0, 4)
            .map((rec: { title: string; poster_path: string; id: number }) => ({
              Title: rec.title,
              Poster: `https://image.tmdb.org/t/p/w500${rec.poster_path}`,
              MovieID: rec.id.toString(),
            }));

          setRecommendations(recommendationList);
        } else {
          setRecommendations([]);
        }
      } else {
        setMovie(null);
        setRecommendations([]);
      }
    } catch (error) {
      console.error("Error fetching this movie", error);
      setMovie(null);
      setRecommendations([]);
    }
  };

  //Handler for Add to Favorites button
  const handleAddToFavorites = async (movieID: string, UserID: number) => {
    try {
      await favs.addFavoriteMovie(Number(movieID), Number(UserID));
      console.log("Movie added to favorites:", movieID);
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
    }
  };

  /* Fall back to default header if `Title` is undefined
  Does `Title` exist? If so, render the `MovieDetail` card 
  If not, render a different header */

  return (
    <section className="omdb-container">
      <section>
        <h1 className="movieTitle">
          {movie?.Title || "Search for a Movie to Begin"}
        </h1>
        {movie ? (
          <div>
            <img
              className="searchedMovie"
              src={movie.Poster}
              alt={movie.Title}
            />
            <h2>
              {user && (
                <button
                  className="searchmovie-btn neon-text"
                  onClick={() => handleAddToFavorites(movie.MovieID, user.id)}
                >
                  Add to Favorites
                </button>
              )}
            </h2>
            <ul>
              <li>
                <span>Genre:</span> {movie.Genre}
              </li>
              <li>
                <span>Description:</span> {movie.Plot}
              </li>
              <li>
                <span>Release Date:</span> {movie.Released}
              </li>
            </ul>
          </div>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </section>
      <section>
        <h2>Recommended Movies</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {recommendations.map((rec) => (
            <div className="recmov" key={rec.MovieID}>
              <img
                src={rec.Poster}
                alt={rec.Title}
                style={{ width: "100px" }}
              />
              <p className="recTitle">{rec.Title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="searchForm">
        <SearchForm
          search={search}
          setSearch={setSearch}
          onSearchSubmit={handleFormSubmit}
        />
      </section>
    </section>
  );
}

export default OmdbContainer;

//! Original code
// const OmdbContainer = () => {
//   // Set state for the search result and the search query
//   const [result, setResult] = useState({});
//   const [search, setSearch] = useState("");

//   // When the search form is submitted, use the API.search method to search for the movie(s)
//   const searchMovie = (query) =>
//     API.search(query)
//       .then((res) => {
//         setResult(res.data);
//         setSearch("");
//       })
//       .catch((err) => console.log(err));

//   // When the component loads, use the API.search method to render a default search result
//   // The empty optional array [] will cause the hook to only run one time after the component loads

//   // Handler for input changes to the search form
//   const handleInputChange = (e) => setSearch(e.target.value);

//   // Handler for what happens when the search form is submitted
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     searchMovie(search);
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(event.target.value);
//   };
// console.log(search)
// const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   //props.searchMovie(search);

//   const result = await searchMovie(search);
//   console.log("Fetched Data:", result.data);

// useEffect(() => {
//   searchMovie("Harry Potter");
// }, []);

// if (result.data.Response === "True") {
//   const movieData: Movie = {
//     Title: result.data.results.title,
//     Poster: result.data.results.poster_path,
//     Genre: result.data.results.genre_ids,
//     MovieID: result.data.results.id,
//   };
