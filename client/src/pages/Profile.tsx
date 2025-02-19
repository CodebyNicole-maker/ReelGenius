//Todo: Import styles as needed

//Todo: Import FavoritesCarousel from FavoritesCarousel

//Todo: Import OMDBcontainer to fetch movie data

//Todo: Import MovieModal to display movie details

//Todo: Import UserList to display user data
//? UserList is currently pulling all users and should only pull logged in user
//? To display and populate username and favorite movies in the profile.tsx page

//Todo: Import LoadingPage to display loading animation

//Todo: Import useEffect and useState hooks from React
//Todo: Import react-router-dom to use the Link component

//Todo: Import auth to check if user is logged in
//? Striken code is used to check if user is logged in


//// const [loginCheck, setLoginCheck] = useState(false);

//   // Function to check if the user is logged in using auth.loggedIn() method
////   const checkLogin = () => {
////     if (auth.loggedIn()) {
////       setLoginCheck(true); // Set loginCheck to true if user is logged in
////     }
////   };

//   // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
////   useEffect(() => {
////     checkLogin(); // Call checkLogin() function to update loginCheck state
////   }, [loginCheck]); // Dependency array ensures useEffect runs when loginCheck changes




//Todo: Create a container to include the OMDBcontainer, MovieModal, and UserList components

//Todo: Add imported FavoritesCarousel component to the container
    

//Todo: Add a loading animation to display while fetching data

//Todo: Fetch movie data based on user's favorite movies from the TMDB_API

//Todo: Populate the carousel with the user's favorite movies


//Todo: Add stylized buttons that say Watch Now and Recommend
//! Watch Now does not have a function yet

//Todo: Recommend button will display MovieModal, from the currently highlighted movie