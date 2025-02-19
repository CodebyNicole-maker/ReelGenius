import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUser } from "../api/nateTheGreateAPI"; // Use the new function
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from "../components/Users";
import auth from "../utils/auth";
import OMDBContainer from "../components/OMDBcontainer";
import '../styles/Home.css'
const Home = () => {
  const [user, setUser] = useState<UserData | null>(null); // Store a single user
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  // Check if the user is logged in
  useLayoutEffect(() => {
    checkLogin();
  }, []);

  // Fetch the logged-in user's data
  useEffect(() => {
    if (loginCheck) {
      fetchUser();
    }
  }, [loginCheck]);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  // Fetch the logged-in user
  const fetchUser = async () => {
    try {
      const userId = auth.getProfile().id; // Get the logged-in user's ID
      if (userId) {
        const data = await retrieveUser(userId); // Fetch the user by ID
        setUser(data);
      }
    } catch (err) {
      console.error("Failed to retrieve user:", err);
      setError(true);
    }
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <h1>Home</h1>

      <OMDBContainer />
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Login to view all your Movies!</h1>
        </div>
      ) : (
        <UserList user={user} /> 
      )}
    </>
  );
};

export default Home;

