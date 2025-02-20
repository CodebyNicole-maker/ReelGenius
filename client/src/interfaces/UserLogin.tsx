// Interface definition for UserLogin
export interface UserLogin {
  username: string | null;  // Property for storing username, nullable
  email?: string | null; 
  password: string | null;  // Property for storing password, nullable
  favorite_movies?: string[] | number[] | null; // Property for storing favorite movies, optional and nullable
  reviewIDs?: string[] | number[] | null; // Property for storing review IDs, optional and nullable
}
