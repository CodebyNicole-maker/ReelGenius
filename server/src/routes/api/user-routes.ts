import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /users/:id - Get a user by id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /users/:id - Update a user by id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

//PUT /users/:id - Update a user's favorite movies by id
router.put('/:id/favorites', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { favorite_movies } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.favorite_movies = favorite_movies;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
);



// DELETE /users/:id - Delete a user by id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});


//Post reviews to reviews table and add review id to user table
router.post('/:id/reviews', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reviewId } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      if (!user.reviewsId) {
        user.reviewsId = [];
      }
      user.reviewsId.push(reviewId);
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /users/:id/reviews - Delete a review by id
router.delete('/:id/reviews', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reviewId } = req.body;
  try{
    const user = await User.findByPk(id);
    if (user) {
      if (user.reviewsId && user.reviewsId.includes(reviewId)) {
        user.reviewsId = user.reviewsId.filter((id) => id !== reviewId);
        await user.save();
        res.json({ message: 'Review deleted' });
      } else {
        res.status(404).json({ message: 'Review not found' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
);

// GET all reviews for all users
router.get('/reviews', async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ['username', 'reviewsId']
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});






export { router as userRouter };
