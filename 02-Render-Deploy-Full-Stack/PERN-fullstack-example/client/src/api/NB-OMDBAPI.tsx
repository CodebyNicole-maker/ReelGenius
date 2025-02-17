import express, { Request, Response, Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

if (!OMDB_API_KEY) {
  throw new Error('OMDB API key is missing. Set it in your environment variables.');
}

// 🎬 GET /movies/search - Search movies by title
router.get('/movies/search', async (req: Request, res: Response) => {
  const query = req.query.query as string;
  const year = req.query.year as string | undefined;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        apikey: OMDB_API_KEY,
        s: query,  // 's' parameter searches for a title
        y: year,   // Optional year parameter
      },
    });

    if (response.data.Response === 'False') {
      return res.status(404).json({ message: response.data.Error });
    }

    res.json(response.data);
  } catch (error: any) {
    console.error('Error searching movies:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// 🎬 GET /movies/:id - Get movie details by IMDb ID
router.get('/movies/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const plot = req.query.plot as 'short' | 'full' | undefined; // Optional plot parameter

  if (!id) {
    return res.status(400).json({ message: 'Movie ID is required' });
  }

  try {
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        apikey: OMDB_API_KEY,
        i: id,  // 'i' parameter fetches details by IMDb ID
        plot: plot || 'short', // Default to 'short' plot
      },
    });

    if (response.data.Response === 'False') {
      return res.status(404).json({ message: response.data.Error });
    }

    res.json(response.data);
  } catch (error: any) {
    console.error('Error fetching movie details:', error.message);
    res.status(500).json({ message: error.message });
  }
});

export { router as movieRouter };
