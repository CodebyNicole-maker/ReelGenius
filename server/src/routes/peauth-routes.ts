import { Router, Request, Response } from 'express';
import { User, Review } from '../models/index.js';  // Import the Review model along with User
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });  
};

export const signUp = async (req: Request, res: Response) => {
  try {
    //todo added reviewComment, reviewRatingto grab from body
    const { username, email, password } = req.body;

    const reviewComment = req.body.reviewComment || 'This is a default review.';  //todo Default review comment if not provided
    const reviewRating = req.body.reviewRating || 5;  //todo Default review rating if not provided
    const reviewID = req.body.reviewID || 2;  //todo Default review ID if not provided
    const movieID = req.body.movieID || 672;  //todo Default movie ID for the review
    const userID = req.body.userID || 0;  //todo Default user ID for the review

    const reviewsShell = await Review.create({
      id: reviewID,  //todo Assuming a default review ID if not provided
      comment: reviewComment,  //todo User's provided comment
      star_review: reviewRating,  //todo User's provided rating
      movieId: movieID,  //todo Assuming a default movie ID for the review 
      userId: userID,  //todo Assuming a default user ID for the review 
    });
    console.log(reviewsShell);
    
    //todo Create the new user
    const newUser = await User.create({ username, email, password, favorite_movies: [], reviewsId: [] });  //todo Assuming reviewsId is an array of movie IDs

    console.log(newUser);

    const secretKey = process.env.JWT_SECRET_KEY || '';

    const token = jwt.sign({ username: newUser.username }, secretKey, { expiresIn: '1h' });
    res.json({ token });  // Send the token as a JSON response
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const router = Router();

router.post('/login', login);  
router.post('/signup', signUp);

export default router;


// //todo Create a review with the user's provided comment and rating
// const newReview = await Review.create({
//   id: reviewID || 2,  //todo Assuming a default review ID if not provided
//   comment: reviewComment || 'This is a default review.', 
//   star_review: reviewRating || 5, 
//   movieId: favorite_movies | 672,  //todo Assuming a default movie ID for the review 
//   userId: newUser.id | 0,  
// });
// console.log(newReview);