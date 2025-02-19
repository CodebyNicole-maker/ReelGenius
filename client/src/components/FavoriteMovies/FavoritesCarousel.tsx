import React, { useState, useEffect } from 'react';
import MovieModal from '../Movie Modal/MovieModal';
import type { UserData } from '../../interfaces/UserData'; 
import '../../styles/carousel.css'; 

interface FavoritesCarouselProps {
    user: UserData | null; 
}

const FavoritesCarousel: React.FC<FavoritesCarouselProps> = ({ user }) => {
    const [favoriteMovies, setFavoriteMovies] = useState<string[]>(user?.favorite_movies || []);
    const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (user) {
            setFavoriteMovies(user.favorite_movies || []); 
        }
    }, [user]);
    // const openUrl = (url: string, label: string) => {
    //     window.open(url, label='_blank');
    // }

    const toggleFavorite = async (movie: string) => {
        // Update the favoriteMovies list immediately
        const updatedMovies = favoriteMovies.includes(movie)
            ? favoriteMovies.filter((m) => m !== movie)  
            : [...favoriteMovies, movie];  

        setFavoriteMovies(updatedMovies); 

        
        try {
            await fetch('/api/updateFavorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user?.id,  // Assuming user ID is available
                    favorite_movies: updatedMovies,
                }),
            });
        } catch (err) {
            console.error('Failed to update favorite movies:', err);

        }
    };

    const handleNextClick = () => {
        setCurrentIndex((currentIndex + 1) % favoriteMovies.length);
    };

    const handlePrevClick = () => {
        setCurrentIndex((currentIndex - 1 + favoriteMovies.length) % favoriteMovies.length);
    };

    const openMovieModal = (movie: string) => {
        setSelectedMovie(movie);
    };

    return (
        <div className="favorites-carousel-container">
            <h2>Your Favorite Movies</h2>
            <div className="carouselwrapper module-wrapper">
                <button onClick={handlePrevClick} className="carousel-button carousel-prev">
                    &lsaquo;
                </button>
                <div className="carousel">
                    {favoriteMovies.length ? (
                        <div className="carousel-item">
                            <h3>{favoriteMovies[currentIndex]}</h3>
                            <button
                                onClick={() => toggleFavorite(favoriteMovies[currentIndex])}
                            >
                                {favoriteMovies.includes(favoriteMovies[currentIndex]) ? '❤️' : '🤍'}
                            </button>
                            <button onClick={() => openMovieModal(favoriteMovies[currentIndex])}>
                                View Details
                            </button>
                        </div>
                    ) : (
                        <p>No favorite movies yet.</p>
                    )}
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

export default FavoritesCarousel;