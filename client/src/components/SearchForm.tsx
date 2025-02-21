import React from "react";
import "../styles/searchform.css";

interface SearchFormProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSearchSubmit: (query: string) => void;
}

//Todo: Add css, bootstrap, or inline styling to match search bar in wireframe
//? This is currently being handled in OMDBContainer
//? Options are to import from OMDBContainer or make new search bar component

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
        <label className="inputlabel" htmlFor="search">
          Search:{" "}
        </label>
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
        <button className="searchmovie-btn neon-text" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
