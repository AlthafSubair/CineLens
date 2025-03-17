import express from 'express';
import { addRate, addReview, addWatchlist, deleteReview, deleteWatchlist, getCast, getCorusel, getMovieById, getMovies, getRateById, getReviews, getWatchlist, searchMovies } from '../controllers/userController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/movies', getMovies)
router.get('/movies/:movieId', getMovieById)
router.get('/movie/cast/:id', getCast);

router.post('/rate/:movieId', verifyToken, addRate);
router.get('/rate/:userId/:movieId', verifyToken, getRateById);

router.post('/review/:movieId', verifyToken, addReview)
router.get('/review/:movieId', getReviews)
router.delete('/review/:revid', verifyToken, deleteReview)


router.post('/watchlist/:movieId', verifyToken, addWatchlist);
router.get('/watchlist/:userId', verifyToken, getWatchlist);
router.delete('/watchlist/:watchlistId', verifyToken, deleteWatchlist);

router.get('/search/:query', searchMovies);

router.get('/corusel', getCorusel);

export default router;