import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import FavoritesCarousel from '../components/FavoriteMovies/FavoritesCarousel';
import auth from "../utils/auth";
import type { UserData } from "../interfaces/UserData";
import MovieModal from "../components/Movie-Modal/MovieModal";

const styles = {
  profileContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    border: "3px solid #ff7f50",
  },
  profileSection: {
    backgroundColor: "#444",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "5px",
  },
  sectionHeading: {
    color: "#fff",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },
  userInfo: {
    fontSize: "16px",
    color: "#fff",
  },
  link: {
    display: "inline-block",
    padding: "10px 15px",
    backgroundColor: "#ff7f50",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    marginTop: "20px",
    transition: "background-color 0.3s ease",
  },
  linkHover: {
    backgroundColor: "#ff6347",
  },
  searchContainer: {
    textAlign: "center" as const,
    marginTop: "20px",
  },
  movieGridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
  },
  noFavoritesMessage: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "2rem",
    color: "#fff",
  },
};

const Profile: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.loggedIn()) {
        try {
          const userData = auth.getProfile();
          setUser({
            id: userData.id ?? null,
            username: userData.username ?? "Guest",
            email: userData.email ?? null,
            favorite_movies: userData.favorite_movies || [],
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
    return <div style={styles.profileContainer}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={styles.profileContainer}>
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div style={styles.profileContainer}>
      <div style={styles.profileSection}>
        <h2 style={styles.sectionHeading}>Welcome, {user.username}!</h2>
        <p style={styles.userInfo}>Email: {user.email}</p>
      </div>

      <div style={styles.profileSection}>
        <h2 style={styles.sectionHeading}>Your Favorite Movies</h2>
        {/* <div style={styles.movieGridContainer}>
                    {user.favorite_movies.length > 0 ? (
                        user.favorite_movies.map((movieId) => (            //todo movie id
                            <div key={movieId} style={{
                                backgroundColor: '#555', 
                                color:'#fff',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                                height:'150px' 
                            }}>
                                Movie ID {movieId} {}     //todo this is where put movie at
                            </div>
                        ))
                    ) : (
                        <div
                        //  style={styles.noFavoritesMessage}
                         >
                            No favorite movies yet. Add some movies to your favorites!
                        </div>
                    )}
                </div> */}
      </div>

      <div style={styles.searchContainer}>
        <button className="searchmovie-btn" onClick={() => setModalShow(true)}>
          <span className="neon-text">Search</span>
        </button>
      </div>

      <MovieModal show={modalShow} onHide={() => setModalShow(false)} />

      {/* Center Go Back to Home Link */}
      <div style={{ textAlign: "left", marginTop: "20px" }}>
        <Link
          to="/"
          style={styles.link}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.linkHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.link.backgroundColor)
          }
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Profile;
