
import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', email: 'jolly@guru.com', password: 'password', favorite_movies: ['21', '1', '999', '1000', '1001', '1002', '1003', '1004', '1005']}, //todo List of user's favorite movies

    { username: 'SunnyScribe', email: 'sunny@scribe.com', password: 'password', favorite_movies: ['672', '673', '982']},
    { username: 'RadiantComet', email: 'radiant@comet.com', password: 'password', favorite_movies: ['312', '5412', '234']}
  ], { individualHooks: true });
};


//Todo: favorite_movies: ['Inception', 'The Matrix', 'Interstellar'],},--- on this code ive added an array of favrotite movies
