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

import React from "react";

interface SearchFormProps {
  value: string;
  name: string;
  type: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  value,
  name,
  type,
  handleInputChange,
  handleFormSubmit,
}) => {
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

const SearchForm: React.FC<SearchFormProps> = ({
  value,
  name,
  type,
  handleInputChange,
  handleFormSubmit,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        value={value}
        name={name}
        type={type}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
