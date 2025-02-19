import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoritesCarousel from '../components/FavoriteMovies/FavoritesCarousel';
import OMDBcontainer from '../components/OMDBcontainer';
import MovieModal from '../components/Movie Modal/MovieModal';
import UserList from '../components/Users';
import auth from '../utils/auth';
import type { UserData } from '../interfaces/UserData';

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

    useEffect(() => {
        if (auth.loggedIn()) {
            const userData = auth.getProfile();
            setUser({
                id: userData.id ?? null,
                username: userData.username ?? 'Guest',
                email: userData.email ?? null,
                favorite_movies: userData.favorite_movies || [],
            });
        }
    }, []);

    const handleRecommendClick = (movie: string) => {
        setSelectedMovie(movie);
    };

    return (
        <div className="profile-container">
            <style>
                {`
                .profile-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    padding: 20px;
                    background-color: #f4f4f4;
                    min-height: 100vh;
                }

                .heading {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 20px;
                }

                .profile-section {
                    width: 100%;
                    max-width: 1200px;
                    margin-bottom: 30px;
                }

                .button {
                    padding: 12px 20px;
                    font-size: 1.2rem;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .watch-now-button {
                    background-color: #007BFF;
                    color: white;
                }

                .watch-now-button:hover {
                    background-color: #0056b3;
                }

                .recommend-button {
                    background-color: #28a745;
                    color: white;
                }

                .recommend-button:hover {
                    background-color: #218838;
                }

                .link {
                    color: #007BFF;
                    text-decoration: none;
                    font-size: 1.1rem;
                    margin-top: 20px;
                    display: inline-block;
                    text-align: center;
                }
                `}
            </style>

            <h1 className="heading">Welcome, {user?.username || 'Guest'}!</h1>

            <div className="profile-section">
                <h2>Your Favorite Movies</h2>
                {user && user.favorite_movies && user.favorite_movies.length > 0 ? (
                    <FavoritesCarousel user={user} />
                ) : (
                    <p>No favorite movies added yet.</p>
                )}
            </div>

            <div className="profile-section">
                <h2>Movie Recommendations</h2>
                <OMDBcontainer />
            </div>

            <div>
                <button className="button watch-now-button">Watch Now</button>
                {user && user.favorite_movies && user.favorite_movies.length > 0 && (
                    <button
                        className="button recommend-button"
                        onClick={() => handleRecommendClick(user.favorite_movies![0])}
                    >
                        Recommend
                    </button>
                )}
            </div>

            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}

            <UserList user={user} />

            <Link to="/" className="link">Go Back to Home</Link>
        </div>
    );
};

export default Profile;
