import { Review } from '../models/index.js';
import { User } from '../models/index.js'
export const seedReviews = async () => {
  const users = await User.findAll(); 
  await Review.bulkCreate(
    [
      {
        comment: 'Amazing movie with a complex storyline!',
        star_review: 5,
        userId: users[0].id, 
      },
      {
        comment: 'A masterpiece of cinema, highly recommend!',
        star_review: 5,
        userId: users[1].id, 
      },
      {
        comment: 'One of the best superhero movies ever made!',
        star_review: 4,
        userId: users[2].id, 
      },
    ]
  );
};

 