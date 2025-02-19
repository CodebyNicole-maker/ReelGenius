import { useState } from "react";
import { searchMovie, getRecommendations } from "../utils/API";
import SearchForm from "./SearchForm";

console.log(getRecommendations);
console.log(searchMovie);


//Todo: edit following code to only store the movie and the following movie details
//? this will be used in favorites caurosel and movie modal
//! - Title - Poster - Genre - MovieID - Plot - Director - Actors - Released - Runtime - Rating - Votes - BoxOffice - Production - Website
//? Not 


function OmdbContainer() {
  const [search, setSearch] = useState<string>("");
  interface Movie {
    Title: string;
    Poster: string;
    Genre: string;
    MovieID: string;
  }

  const [movie, setMovie] = useState<Movie | null>(null);
  // State to store movie detail

  const handleFormSubmit = async (query: string) => {
    try {
      const result = await searchMovie(query);
      console.log("Fetched Data:", result);

      if (result.data.Response === "True") {
        const movieData: Movie = {
          Title: result.data.data.results.title,
          Poster: result.data.data.results.poster_path,
          Genre: result.data.data.results.genre_ids,
          MovieID: result.data.data.results.id,
        };

        setMovie(movieData);
      } else {
        setMovie(null);
      }
    } catch (error) {
      console.error("Error fetching this movie", error);
      setMovie(null);
    }
  };

  /* Fall back to default header if `Title` is undefined
  Does `Title` exist? If so, render the `MovieDetail` card 
  If not, render a different header */

  return (
    <section>
      <div>
        <div>
          <h1>{movie?.Title || "Search for a Movie to Begin"}</h1>
          {movie ? (
            <div>
              {/* <h2>{movie.Title}</h2> */}
              <img src={movie.Poster} alt={movie.Title} />
              <p>{movie.Genre}</p>
            </div>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </div>
        <div>
          <SearchForm
            search={search}
            setSearch={setSearch}
            onSearchSubmit={handleFormSubmit}
          />
        </div>
      </div>
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
