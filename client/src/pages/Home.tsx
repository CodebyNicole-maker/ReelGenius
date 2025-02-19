import { useState, useEffect, useLayoutEffect, SetStateAction } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import auth from "../utils/auth";


//! Test Imports Below
  import UserList from "../components/Users";
  import OMDBContainer from "../components/OMDBcontainer";


// import SearchForm from "../components/SearchForm";



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


  //! OMDB Container code version
  // import UserList from "../components/Users";
  // import OMDBContainer from "../components/OMDBcontainer";
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
