
import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', email: 'jolly@guru.com', password: 'password', favorite_movies: ['Inception', 'The Matrix', 'Interstellar'],}, //todo List of user's favorite movies

    { username: 'SunnyScribe', email: 'sunny@scribe.com', password: 'password', favorite_movies: ['The Godfather', 'Pulp Fiction', 'Shawshank Redemption'],},
    { username: 'RadiantComet', email: 'radiant@comet.com', password: 'password', favorite_movies: ['The Dark Knight', 'Gladiator', 'The Prestige'],}
  ], { individualHooks: true });
};


//Todo: favorite_movies: ['Inception', 'The Matrix', 'Interstellar'],},--- on this code ive added an array of favrotite movies
