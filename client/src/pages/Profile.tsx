import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoritesCarousel from '../components/FavoriteMovies/FavoritesCarousel';
// import OMDBContainer from '../components/OMDBcontainer';
import auth from '../utils/auth';
import type { UserData } from '../interfaces/UserData';

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.loggedIn()) {
                try {
                    const userData = auth.getProfile();
                    console.log("Raw user data from token:", userData);

                    // If you need to fetch additional user data from an API, do it here
                    // const response = await fetch(`/api/users/${userData.id}`, {
                    //     headers: { 'Authorization': `Bearer ${auth.getToken()}` }
                    // });
                    // const additionalUserData = await response.json();

                    setUser({
                        id: userData.id ?? null,
                        username: userData.username ?? 'Guest',
                        email: userData.email ?? null,
                        favorite_movies: userData.favorite_movies || []
                    });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="profile-container">
            <h1 className="heading">Welcome, {user.username}!</h1>

            <div className="profile-section">
                <h2>Your Profile Information</h2>
                <p>Email: {user.email}</p>
                {/* Add more user information here as needed */}
            </div>

            <div className="profile-section">
                <h2>Your Favorite Movies</h2>
                <FavoritesCarousel user={user} />
            </div>

            {/* <div className="profile-section">
                <h2>Movie Recommendations</h2>
                <OMDBContainer />
            </div> */}

            <Link to="/" className="link">Go Back to Home</Link>
        </div>
    );
};

export default Profile;