import React, { useState } from "react";
import { searchMovie, searchTMDB } from "../utils/API";

function SearchForm() {
  const [search, setSearch] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //props.searchMovie(search);

    const results = await searchMovie(search);
    // const results = await searchTMDB(search);
    console.log(results);
    // Clear the search field
    setSearch("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="search">Search:</label>
        <input
          onChange={handleInputChange}
          value={search}
          name="search"
          type="text"
          className="form-control"
          placeholder="Search For a Movie"
          id="search"
        />
        <br />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
