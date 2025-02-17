import { Router, Request, Response } from 'express';
import { User, Review } from '../models/index';  // Import the Review model along with User
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
    const { username, email, password, favorite_movies, reviewComment, reviewRating } = req.body;

    //todo Create the new user
    const newUser = await User.create({ username, email, password, favorite_movies });

    //todo Create a review with the user's provided comment and rating
    const newReview = await Review.create({
      comment: reviewComment || 'This is a default review.', 
      star_review: reviewRating || 5,  
      userId: newUser.id,  
    });

    console.log(newUser);
    console.log(newReview);

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
