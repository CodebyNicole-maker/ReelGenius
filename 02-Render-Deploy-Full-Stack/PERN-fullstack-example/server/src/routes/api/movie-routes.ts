import express from "express";
import type { Request, Response } from "express";

const router = express.Router();

router.get("/movies", async (_req: Request, res: Response) => {
  try {
    const movie = await Movie.findAll({
      // attributes: { exclude: ["password"] },
    });
    res.json(movie);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/movies/:genre", async (req: Request, res: Response) => {
  const { genre } = req.params;
  try {
    const movie = await Movie.findByPk(
      genre
      // {      attributes: { exclude: ["password"] },    }
    );
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
