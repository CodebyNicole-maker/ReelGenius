import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoritesCarousel from '../components/FavoriteMovies/FavoritesCarousel';

import auth from '../utils/auth';
import type { UserData } from '../interfaces/UserData';


const Profile: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);
    

    // Fetch the logged-in user's data
    useEffect(() => {
        if (auth.loggedIn() && !user) { // Ensure we only fetch once if user is null
            const userData = auth.getProfile();
            setUser({
                id: userData.id ?? null,
                username: userData.username ?? 'Guest',
                email: userData.email ?? null,
                favorite_movies: userData.favorite_movies || [],
            });
        }
    }, [user]);

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


            <Link to="/" className="link">Go Back to Home</Link>
        </div>
    );
};

export default Profile;