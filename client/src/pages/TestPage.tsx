// import { useState, useEffect, useLayoutEffect } from "react";
// import { retrieveUsers } from "../api/userAPI";
// import type { UserData } from "../interfaces/UserData";
// import ErrorPage from "./ErrorPage";
// import UserList from "../components/Users";
// import auth from "../utils/auth";


//Todo: Import components to test
//! import FavoritesCarousel from "../components/FavoriteMovies/FavoritesCarousel";
import Loader from "../components/LoadingPage";

//This page will be used to test components

const Test = () => {
//   const [users, setUsers] = useState<UserData[]>([]);
//   const [error, setError] = useState(false);
//   const [loginCheck, setLoginCheck] = useState(false);
//Todo: Test components will be written below




//Favorite Carousel Test
// return (
//     <>
//         <h1 className="pb-5">Test Page</h1>
//         <h2>Favorites Carousel</h2>
//         <FavoritesCarousel items={[]} sendInteraction={function (): void {
//             throw new Error("Function not implemented.");
//         } }/>
    
//     </>
// )

// Loading Page Test



return (
    <>
        <h1 className="pb-5">Test Page</h1>
        <h2>Loading Page</h2>
        <Loader />
    </>
)

}


export default Test;