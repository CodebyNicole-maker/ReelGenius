export interface UserData {
  id: number | null;
  username: string | null;
  email: string | null;
  favorite_movies?: string[] | number[] | null;
  reviewIDs?: string [] | number [] | null;
}
