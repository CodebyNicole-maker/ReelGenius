import React, { useState, useEffect } from 'react';
import MovieModal from '../Movie-Modal/MovieModal';
import type { UserData } from '../../interfaces/UserData'; 
import '../../styles/carousel.css'; 
import Auth from '../../utils/auth';
import {getMoviebyID} from '../../utils/API'
// import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from '../../assets/wireframeAssets/userProfile.png';


interface FavoritesCarouselProps {
    user: UserData | null; 
}

const FavoritesCarousel: React.FC<FavoritesCarouselProps> = ({ user }) => {
    const [favoriteMovies, setFavoriteMovies] = useState<string[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if (user && user.favorite_movies) {
            setFavoriteMovies(user.favorite_movies);
        }
    }, [user]);

    const toggleFavorite = async (movie: string) => {
        if (!user || !user.id) {
            console.error("Cannot toggle favorite: User not logged in");
            return;
        }

        let updatedMovies: string[];
        if (favoriteMovies.includes(movie)) {
            // Remove the movie if it's already a favorite
            updatedMovies = favoriteMovies.filter((m) => m !== movie);
        } else {
            // Add the movie if it's not a favorite
            updatedMovies = [...favoriteMovies, movie];
        }

        setFavoriteMovies(updatedMovies);

        try {
            const response = await fetch('/api/updateFavorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getToken()}`
                },
                body: JSON.stringify({
                    userId: user.id,
                    favorite_movies: updatedMovies,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update favorites');
            }

            const result = await response.json();
            console.log("Favorites updated successfully:", result);
        } catch (err) {
            console.error('Failed to update favorite movies:', err);
            // Revert the local state if the API call fails
            setFavoriteMovies(user.favorite_movies || []);
        }
    };

    const handleNextClick = () => {
        if (favoriteMovies.length > 0) {
            setCurrentIndex((currentIndex + 1) % favoriteMovies.length);
        }
    };

    const handlePrevClick = () => {
        if (favoriteMovies.length > 0) {
            setCurrentIndex((currentIndex - 1 + favoriteMovies.length) % favoriteMovies.length);
        }
    };

    const openMovieModal = (movie: string) => {
        setSelectedMovie(movie);
    };

    if (favoriteMovies.length === 0) {
        return <p>No favorite movies yet. Add some movies to your favorites!</p>;
    }

    return (
        <div className="favorites-carousel-container">
            <h2>Your Favorite Movies</h2>
            <div className="carouselwrapper module-wrapper">
                <button onClick={handlePrevClick} className="carousel-button carousel-prev">
                    &lsaquo;
                </button>
                <div className="carousel">
                    <div className="carousel-item">
                        <h3>{favoriteMovies[currentIndex]}</h3>
                        <button onClick={() => toggleFavorite(favoriteMovies[currentIndex])}>
                            {favoriteMovies.includes(favoriteMovies[currentIndex]) ? '❤️' : '🤍'}
                        </button>
                        <button onClick={() => openMovieModal(favoriteMovies[currentIndex])}>
                            View Details
                        </button>
                    </div>
                </div>
                <button onClick={handleNextClick} className="carousel-button carousel-next">
                    &rsaquo;
                </button>
            </div>
            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}
        </div>
    );
};



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






export default FavoritesCarousel;