import { useState, useEffect } from "react";
import { searchMovie } from "../utils/API";
import SearchForm from "./SearchForm";


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

console.log(searchMovie)

function OmdbContainer() {
  const [search, setSearch] = useState<string>("");
  interface Movie {
    Title: string;
    Poster: string;
    Genre: string;
  }

  const [movie, setMovie] = useState<Movie | null>(null); 
  // State to store movie detail

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //props.searchMovie(search);

    const result = await searchMovie(search);
    console.log("Fetched Data:", result);


  // useEffect(() => {
  //   searchMovie("Harry Potter");
  // }, []);


    try {
      const result = await searchMovie(search);
      console.log("Fetched Data:", result);

      if (result.data.Response === "True") {
        // Extract only the relevant fields to match the Movie interface
        const movieData: Movie = {
          Title: result.data.Title,
          Poster: result.data.Poster,
          Genre: result.data.Genre,
        };
        setMovie(movieData);
      } else {
        setMovie(null);
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
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
              <h2>{movie.Title}</h2>
              <img src={movie.Poster} alt={movie.Title} />
              <p>{movie.Genre}</p>
            </div>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </div>
        <div>
          <SearchForm
            value={search}
            name="search"
            type="text"
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </section>
  );
}

export default OmdbContainer;
