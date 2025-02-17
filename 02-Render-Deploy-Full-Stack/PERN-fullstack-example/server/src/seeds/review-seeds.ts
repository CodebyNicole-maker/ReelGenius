import { Review } from '../models/index.js';       //todo Import the Review model

import { User } from '../models/index.js'            //todo Import the User model
export const seedReviews = async () => {
  //todo Fetch all users from the database to associate reviews with users
  const users = await User.findAll(); 

  //todo Bulk insert multiple reviews into the Review table
  await Review.bulkCreate([
    {
      comment: 'Amazing movie with a complex storyline!', // Review text
      star_review: 5,
      userId: users[0].id, //todo Associates this review with the first user in the database
    },
    {
      comment: 'A masterpiece of cinema, highly recommend!', // Review text
      star_review: 5,
      userId: users[1].id, //todo Associates this review with the second user
    },
    {
      comment: 'One of the best superhero movies ever made!', // Review text
      star_review: 4, 
      userId: users[2].id, //todo Associates this review with the third user
    },
  ]);
};
