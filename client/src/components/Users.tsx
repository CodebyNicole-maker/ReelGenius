import React from 'react';
import type { UserData } from "../interfaces/UserData";

interface UserListProps {
    user: UserData | null; 
}

const UserList: React.FC<UserListProps> = ({ user }) => {
    if (!user) {
        return <p>No user data available.</p>;
    }

    return (
        <div className="profile-user-info">
            <h2>Your Profile</h2>
            <div className="user-details">
                <h3>Username: {user.username}</h3>
                <h4>Email: <a href={`mailto:${user.email}`}>{user.email}</a></h4>
                <div className="favorite-movies">
                    <h4>Favorite Movies:</h4>
                    {user.favorite_movies && user.favorite_movies.length > 0 ? (
                        <ul>
                            {user.favorite_movies.map((movie, index) => (
                                <li key={index}>{movie}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No favorite movies added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserList;

