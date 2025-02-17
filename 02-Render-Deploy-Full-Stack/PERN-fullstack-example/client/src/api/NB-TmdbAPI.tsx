import express from 'express';
import type { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
  throw new Error('TMDB API key is missing. Please set it in your environment variables.');
}

// GET /movies/popular - Get popular movies
router.get('/movies/popular', async (_req: Request, res: Response) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: { api_key: TMDB_API_KEY }
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /movies/:id - Get movie details by ID
router.get('/movies/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: { api_key: TMDB_API_KEY }
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /movies/search - Search movies by query
router.get('/search/movies', async (req: Request, res: Response) => {
    const { query, page, language } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/search/movie?query=${query}`, {
        params: {
          api_key: TMDB_API_KEY,
          query,
          page: page || 1,
          language: language || 'en-US'
        }
      });
      res.json(response.data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

export { router as movieRouter };

