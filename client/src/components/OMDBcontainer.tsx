import { useState, useEffect } from "react";
import { searchMovie, getRecommendations, getMoviebyID } from "../utils/API";
import SearchForm from "./SearchForm";
import "../styles/OMDBcontainer.css";

console.log(getRecommendations);
console.log(searchMovie);
console.log(getMoviebyID);

//Todo: edit following code to only store the movie and the following movie details
// ? this will be used in favorites caurosel and movie modal
// ! - Title - Poster - Genre - MovieID - Plot - Director - Actors - Released - Runtime - Rating - Votes - BoxOffice - Production - Website
// ? Not

function OmdbContainer() {
  const [search, setSearch] = useState<string>("");
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

  const [favoriteMovies, setFavoriteMovies] = useState<string[]>();
  // user?.favorite_movies || []
  // const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  // useEffect(() => {
  //   if (user) {
  //     setFavoriteMovies(user.favorite_movies || []);
  //   }
  // }, [user]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteMovies");
    if (savedFavorites) {
      setFavoriteMovies(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  // const openUrl = (url: string, label: string) => {
  //     window.open(url, label='_blank');
  // }

  // const toggleFavorite = async (movieID: string) => {
  //   if (!movieID) return; // Avoid undefined MovieID issues

  //   // const updatedMovies = favoriteMovies.includes(movieID)
  //   //   ? favoriteMovies.filter((m) => m !== movieID) // Remove if already favorited
  //   //   : [...favoriteMovies, movieID]; // Add if not favorited

  //   // setFavoriteMovies(updatedMovies);

  //   try {
  //     await fetch("/api/updateFavorites", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         // userId: user?.id,
  //         // favorite_movies: updatedMovies,
  //       }),
  //     });
  //   } catch (err) {
  //     console.error("Failed to update favorite movies:", err);
  //   }
  // };

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
            .slice(0, 3)
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

  // function toggleFavorite(arg0: any): void {
  //   throw new Error("Function not implemented.");
  // }

  /* Fall back to default header if `Title` is undefined
  Does `Title` exist? If so, render the `MovieDetail` card 
  If not, render a different header */

  return (
    <section className="omdb-container">
      <section>
        <h1>{movie?.Title || "Search for a Movie to Begin"}</h1>
        {movie ? (
          <div>
            <img src={movie.Poster} alt={movie.Title} />
            <ul>
              <li>{movie.Genre}</li>
              <li>{movie.Plot}</li>
              <li>{movie.Released}</li>
            </ul>
            {/* <button onClick={() => toggleFavorite(movie?.MovieID || "")}>
              {favoriteMovies.includes(movie?.MovieID || "") ? "❤️" : "🤍"}
            </button> */}
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
              <p>{rec.Title}</p>
              {/* <button onClick={() => toggleFavorite(rec.MovieID)}>
                {favoriteMovies.includes(rec.MovieID) ? "❤️" : "🤍"}
              </button> */}
            </div>
          ))}
        </div>
      </section>

      <section>
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
