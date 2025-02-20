import { useState, useEffect, useLayoutEffect } from "react";
// import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import auth from "../utils/auth";
// import OMDBContainer from "../components/OMDBcontainer";
import "../styles/Home.css";
import { retrieveUser } from "../api/nateTheGreateAPI";
import MovieModal from "../components/Movie-Modal/MovieModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";

//! Test Imports Below
import UserList from "../components/Users";
// import SearchForm from "../components/SearchForm";

interface MovieModalProps {
  show: boolean;
  onHide: () => void;
}

const Home = () => {
  const [user, setUser] = useState<UserData | null>(null); // Store a single user
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const [modalShow, setModalShow] = useState(false);

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

  //Todo: Add MovieModal to display movie details from search results

  //Todo: Add "movies-tvshows" styling from center of wireframe home page

  //! OMDB Container code version
  // import UserList from "../components/Users";
  // import OMDBContainer from "../components/OMDBcontainer";
  return (
    <>
      <section className="home-section">
        <button className="searchmovie-btn" onClick={() => setModalShow(true)} ><span className="neon-text">Search</span></ button>
        {/* <OMDBContainer /> */}
        <MovieModal show={modalShow} onHide={() => setModalShow(false)} />
        {!loginCheck ? (
          <div className="login-notice">
            <h1 className="">Login to view all your Movies!</h1>
          </div>
        ) : (
          <>
          <UserList user={user} />
          <div></div></>
        )}
      </section>
    </>
  );
};

//! Testing for new Home version
// return (
//   <>
//     <div>
//       <h1>
//       <img src="../assets/wireframeAssets/HomeLogo.png" alt="Home Logo" />
//       </h1>
//       <h2>
//         <SearchForm search={""} setSearch={function (value: SetStateAction<string>): void {
//           throw new Error("Function not implemented.");
//         } } onSearchSubmit={function (query: string): void {
//           throw new Error("Function not implemented.");
//         } } />
//       </h2>

//       </div>
//   </>
// )
// };

export default Home;
