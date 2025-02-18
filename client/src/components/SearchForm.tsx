import React, { useState } from "react";
import { searchMovie } from "../utils/API";

interface SearchFormProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSearchSubmit: (query: string) => void;
}

function SearchForm({ search, setSearch, onSearchSubmit }: SearchFormProps) {
  // const [search, setSearch] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (search.trim() === "") return;
    onSearchSubmit(search);
    // Clear the search field
    setSearch("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="search">Search: </label>
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
