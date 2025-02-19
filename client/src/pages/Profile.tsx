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

    // Fetch the logged-in user's data
    useEffect(() => {
        if (auth.loggedIn()) {
            const userData = auth.getProfile();
            setUser({
                id: userData.id ?? null,
                username: userData.username ?? 'Guest',
                email: userData.email ?? null,
                favorite_movies: userData.favorite_movies || [], // Ensure favorite_movies is an array
            });
        }
    }, []);

    return (
        <div className="profile-container">
            <h1 className="heading">Welcome, {user?.username || 'Guest'}!</h1>

            {/* Favorite Movies Section */}
            <div className="profile-section">
                <h2>Your Favorite Movies</h2>
                {user && user.favorite_movies && user.favorite_movies.length > 0 ? (
                    <FavoritesCarousel user={user} />
                ) : (
                    <p>No favorite movies added yet.</p>
                )}
            </div>

            {/* Movie Recommendations Section */}
            <div className="profile-section">
                <h2>Movie Recommendations</h2>
                <OMDBcontainer />
            </div>

            {/* Movie Modal */}
            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}

            {/* User Profile Section */}
            <UserList user={user} />

            {/* Go Back to Home Link */}
            <Link to="/" className="link">Go Back to Home</Link>
        </div>
    );
};

export default Profile;