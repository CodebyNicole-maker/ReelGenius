// import React, { useState, useEffect } from 'react';
// import MovieModal from "../Movie-Modal/MovieModal";
// import type { UserData } from "../../interfaces/UserData";
// import "../../styles/carousel.css";
// // import Auth from '../../utils/auth';
// import { getMoviebyID } from "../../utils/API";
// // import { retrieveUser } from '../../api/nateTheGreateAPI';
// import favs from "../favs";
// import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from '../../assets/wireframeAssets/userProfile.png';

// !recently commented out

// interface FavoritesCarouselProps {
//     user: UserData | null;
// }

// const FavoritesCarousel: React.FC<FavoritesCarouselProps> = ({ user }) => {
//     const [favoriteMovies, setFavoriteMovies] = useState<string[]>([]);
//     const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [modalShow, setModalShow] = useState(false);

//     interface Movie {
//         Title: string;
//         Released: string;
//         MovieID: string;
//         Poster: string;
//         Genre: string;
//     }

//     const [movie, setMovie] = useState<Movie[]>([]);

//     const retrieveUserMovie = async () => {
//         try {
//             const movie: number | null = favs.getSingleMovie(currentIndex);
//             const movieString = movie ? movie.toString() : '';
//             const response = await getMoviebyID(movieString);

//             if (response.data) {

//                 const genreMap: { [key: number]: string } = {
//                     28: 'Action',
//                     12: 'Adventure',
//                     16: 'Animation',
//                     35: 'Comedy',
//                     80: 'Crime',
//                     99: 'Documentary',
//                     18: 'Drama',
//                     10751: 'Family',
//                     14: 'Fantasy',
//                     36: 'History',
//                     27: 'Horror',
//                     10402: 'Music',
//                     9648: 'Mystery',
//                     10749: 'Romance',
//                     878: 'Science Fiction',
//                     10770: 'TV Movie',
//                     53: 'Thriller',
//                     10752: 'War',
//                     37: 'Western',
//                 };

//                 const movieDetails: Movie = {
//                     Title: response.data.Title,
//                     Poster: `https://image.tmdb.org/t/p/w500${response.poster_path}`, // Construct full image URL
//                     Genre: response.data.genre_ids
//                         .map((id: number) => genreMap[id] || 'Unknown')
//                         .join(", "), // Convert genre array to a string
//                     Released: response.data.Released,
//                     MovieID: response.data.MovieID,
//                 };

//                 setMovie(response.data);

//         }

//     } catch (error) {
//         console.error('Error retrieving movie:', error);
//         setMovie([]); // Reset movie state on error
//         setSelectedMovie(null); // Reset selected movie state on error
//         setCurrentIndex(0); // Reset current index on error
//         setFavoriteMovies([]); // Reset favorite movies on error
//         setModalShow(false); // Reset modal show state on error
//     }
//     };

//     const toggleFavorite = async (movie: string) => {

//         if (favoriteMovies.includes(movie)) {
//          const pulseUpdate = await favs.addFavoriteMovie(Number(movie));
//         console.log('pulseUpdate', pulseUpdate);
//          }
//             else {
//          const pulseUpdate = await favs.removeFavoriteMovie(Number(movie));
//         console.log('pulseUpdate', pulseUpdate);
//         }
//         }
//     const handleNextClick = () => {
//             if (favoriteMovies.length > 0) {
//                 setCurrentIndex((currentIndex + 1) % favoriteMovies.length);
//             }
//         };

//     const handlePrevClick = () => {
//             if (favoriteMovies.length > 0) {
//                 setCurrentIndex((currentIndex - 1 + favoriteMovies.length) % favoriteMovies.length);
//             }
//         };

// !recently commented out

// add function to store counter for carousel left button and right button add and subtract 1 from the counter and display the movie at that index in the array of favorite movies
// const [carouselIndex, setCarouselIndex] = useState(0);
// const [carouselMovies, setCarouselMovies] = useState<string[]>([]);
// add function to display the movie at the current index in the array of favorite movies

// useEffect(() => {
//     if (user && user.favorite_movies) {
//         setFavoriteMovies(user.favorite_movies);
//     }
// }, [user]);

// const toggleFavorite = async (movie: string) => {
//     if (!user || !user.id) {
//         console.error("Cannot toggle favorite: User not logged in");
//         return;
//     }

//     let updatedMovies: string[];
//     if (favoriteMovies.includes(movie)) {
//         // Remove the movie if it's already a favorite
//         updatedMovies = favoriteMovies.filter((m) => m !== movie);
//     } else {
//         // Add the movie if it's not a favorite
//         updatedMovies = [...favoriteMovies, movie];
//     }

//     setFavoriteMovies(updatedMovies);

//     try {
//         const response = await fetch('/api/updateFavorites', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${Auth.getToken()}`
//             },
//             body: JSON.stringify({
//                 userId: user.id,
//                 favorite_movies: updatedMovies,
//             }),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to update favorites');
//         }

//         const result = await response.json();
//         console.log("Favorites updated successfully:", result);
//     } catch (err) {
//         console.error('Failed to update favorite movies:', err);
//         // Revert the local state if the API call fails
//         setFavoriteMovies(user.favorite_movies || []);
//     }
// };

// !recently commented out

//     return (
//         <div className="favorites-carousel-container">
//             <h2>Your Favorite Movies</h2>
//             <div className="carouselwrapper module-wrapper">
//                 <div className="carousel">
//                     <div className="carousel-item">
//                         <h3>{favoriteMovies[currentIndex]}</h3>
//                         <button onClick={() => toggleFavorite(favoriteMovies[currentIndex])}>
//                             {favoriteMovies.includes(favoriteMovies[currentIndex]) ? '❤️' : '🤍'}
//                         </button>
//                     </div>
//                 </div>
//                 <button className="searchmovie-btn" onClick={() => setModalShow(true)}><span className='neon-text'>Recommendations</span></button>
//                 <MovieModal show={modalShow} onHide={() => setModalShow(false)} />
//                 <div className="carousel-controls">
//                 <button onClick={handlePrevClick} className="searchmovie-btn mt-2">
//                     &lsaquo;
//                 </button>{" "}
//                 <button onClick={handleNextClick} className="prev-btn searchmovie-btn mt-2">
//                    &rsaquo;
//                 </button>
//                     </div>
//             </div>
//         </div>
//     );
// };

// !recently commented out

// import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from '../../assets/wireframeAssets/userProfile.png';

// function FavoritesCarousel() {
//   return (
//     <Carousel>
//       <Carousel.Item interval={1000}>
//         <ExampleCarouselImage  />
//         <Carousel.Caption>
//           <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item interval={500}>
//         <ExampleCarouselImage  />
//         <Carousel.Caption>
//           <h3>Second slide label</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <ExampleCarouselImage  />
//         <Carousel.Caption>
//           <h3>Third slide label</h3>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// }

// export default FavoritesCarousel;
// !recently commented out
