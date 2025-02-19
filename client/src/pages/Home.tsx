import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from "../components/Users";
import auth from "../utils/auth";
// import SearchForm from "../components/SearchForm";
import OMDBContainer from "../components/OMDBcontainer";

const Home = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  //Todo: Add a search bar to search for movies
  //? This is currently being handled in OMDBContainer

  //Todo: change fetchUsers to only pull one user
  //Todo: This will require changing UserList to only display one user
  useEffect(() => {
    if (loginCheck) {
      fetchUsers();
    }
  }, [loginCheck]);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };

  if (error) {
    return <ErrorPage />;
  }

  //Todo: Add MovieModal to display movie details from search results

  //Todo: Add "movies-tvshows" styling from center of wireframe home page

  return (
    <>
      <h1>Home</h1>

      <OMDBContainer />
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Login to view all your Movies!</h1>
        </div>
      ) : (
        <UserList users={users} />
      )}
    </>
  );
};

export default Home;
