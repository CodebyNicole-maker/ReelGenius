import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import "../styles/NavBar.css"



const Navbar = () => {
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in using auth.loggedIn() method
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true); // Set loginCheck to true if user is logged in
    }
  };

  // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
  useEffect(() => {
    checkLogin(); // Call checkLogin() function to update loginCheck state
  }, [loginCheck]); // Dependency array ensures useEffect runs when loginCheck changes

  //ToDo: Style buttons and add a logo consistent with wireframe
  //ToDo: Add a favorites button in the center of the navbar - should also display username when logged in

  return (
    <div className="display-flex justify-space-between align-center py-2 px-5 deep-violet">
      <Link to='/'>
      <div className="logo">
        <img src="src/components/ReelGenius-dark.png" alt="ReelGenius Logo" className="logo"/>
        </div>
      </Link>
      <div>
        {
          // Conditional rendering based on loginCheck state
          !loginCheck ? (
            <>
              {/* Render sign up button if user is not logged in */}
              <button className="btn nav-btn " type="button">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </button>{" "}
              {/* Render login button if user is not logged in */}
              <button className="btn nav-btn" type="button">
                <Link className="nav-link" to="/login">Login</Link>
              </button>{" "}
              <button className="btn nav-btn" type="button">
                <Link className="nav-link" to="/profile">Reviews</Link>
              </button>
            </>
          ) : (
            <>
              <button className="btn nav-btn" type="button">
                <Link className="nav-link" to="/reviews">Reviews</Link>
              </button>{" "}
              <button className="btn nav-btn" type="button">
                <Link className="nav-link" to="/profile">Profile</Link>
              </button>{" "}
              <button
                className="btn nav-btn"
                type="button"
                onClick={() => {
                  auth.logout();
                } }
              >
                  Logout
                </button></>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
