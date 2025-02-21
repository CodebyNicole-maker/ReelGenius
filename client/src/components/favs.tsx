// import { useState, useEffect, useLayoutEffect } from "react";
// import { UserData } from "../interfaces/UserData";
import { getMoviebyID } from "../utils/API";
import auth from "../utils/auth";
// import { retrieveUser } from "../api/nateTheGreateAPI";

console.log(getMoviebyID);

//Using Classes to define the types of the props for the component
// Props should be passed in from the parent component

class favoriteMovieService {
  getmoviesArray() {
    const favMovies: string[] | number[] | null =
      auth.getProfile().favorite_movies; // Get the logged-in user's ID
    console.log(favMovies);
    if (favMovies) {
      return favMovies; // Return the user data
    }
    console.log(favMovies);
  }

  getSingleMovie(index: number): number | null {
    const movieId: number[] | undefined = this.getmoviesArray() as number[];
    if (movieId) {
      const movie: number = movieId[index];
      console.log(movie);
      return movie; // Return the movie ID
    }
    return null; // Return null if there's no user data
  }

  addMovieToFavorites(index: number, UserID: number) {
    const currentMovie: number | null = this.getSingleMovie(index);
    console.log(currentMovie);
    if (currentMovie) {
      // Add the movie to the user's favorites
      this.addFavoriteMovie(currentMovie, UserID);
    }
  }

  removeMovieFromFavorites(index: number) {
    const currentMovie: number | null = this.getSingleMovie(index);
    console.log(currentMovie);
    if (currentMovie) {
      // Remove the movie from the user's favorites
      this.removeFavoriteMovie(currentMovie);
    }
  }

  async addFavoriteMovie(movieID: number, UserID: number) {
    try {
      const currentFavorites = this.getmoviesArray() || [];
      const updatedFavorites = [...currentFavorites, movieID];
      const response = await fetch(`/users/${UserID}/favorites`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify({
          userId: auth.getProfile().id,
          favorite_movies: updatedFavorites,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update favorites");
      }
      const result = response.json();
      console.log("Favorites updated successfully:", result);
    } catch (err) {
      console.error("Failed to update favorite movies:", err);
    }
  }

  async removeFavoriteMovie(movieID: number) {
    try {
      const updatedFavorites = this.getmoviesArray()?.filter(
        (movie) => movie !== movieID
      );
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify({
          userId: auth.getProfile().id,
          favorite_movies: updatedFavorites,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update favorites");
      }
      const result = await response.json();
      console.log("Favorites updated successfully:", result);
    } catch (err) {
      console.error("Failed to update favorite movies:", err);
    }
  }
}

export default new favoriteMovieService();
