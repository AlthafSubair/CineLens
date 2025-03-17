import express from 'express';
import upload from '../middlewares/multer.js';
import { activateMovie, activateMovies, addCast, addCorusel, addmovie, addRoles, deactivateMovie, deleteCast, deleteCorusel, deleteMovie, deleteMultiMovie, deleteRole, disableMovies, editMovie, editRole, getCast, getCastCount, getCorusel, getCountOfUsers, getMovieById, getMovies, getMoviesCount, getRatingsCount, getReviews, getRole, getRoles, getUsers, movieGraph, searchMovies, suspendUser, userGraph } from '../controllers/adminControllers.js';
import verifyToken from '../middlewares/verifyToken.js';



const router = express.Router();

router.get('/test', (req, res) => {
  res.send('admin routes working')
})

router.post('/addroles',  verifyToken, upload.single('image'), addRoles)
router.get('/roles', getRoles)
router.delete('/role/delete/:roleId', verifyToken, deleteRole)
router.get('/role/:roleId', getRole)
router.patch('/role/edit/:roleId', verifyToken, upload.single('image'), editRole)



router.post('/addmovie', verifyToken, upload.single('image'), addmovie)
router.get('/movies', getMovies)
router.delete('/movie/delete/:movieId', verifyToken, deleteMovie)
router.patch('/movie/edit/:movieId', verifyToken, upload.single('image'), editMovie)
router.get('/movie/:movieId', getMovieById)
router.delete('/moviemul/delete',verifyToken, deleteMultiMovie)
router.patch('/movie/activate', verifyToken, activateMovies)
router.patch('/movie/deactivate', verifyToken, disableMovies)

router.patch('/movie/activatebyid/:id', verifyToken, activateMovie)
router.patch('/movie/deactivatebyid/:id', verifyToken, deactivateMovie)


router.post('/movie/addcast/:id', verifyToken, addCast);
router.get('/movie/cast/:id', getCast);
router.delete('/movie/cast/delete/:id', verifyToken, deleteCast);

router.post('/carousel/:movieId', verifyToken, addCorusel)
router.get('/carousel', getCorusel)
router.delete('/carousel/delete/:id', verifyToken, deleteCorusel)

router.get('/usercount', verifyToken, getCountOfUsers)
router.get('/moviesCount', verifyToken, getMoviesCount)
router.get('/ratingcount', verifyToken, getRatingsCount)
router.get('/castcount', verifyToken, getCastCount)

router.get('/getusers', verifyToken,  getUsers)
router.patch('/suspenduser/:userId', verifyToken,  suspendUser)

router.get('/usergraph', verifyToken, userGraph)
router.get('/moviegraph', verifyToken,  movieGraph)

router.get('/review/:movieId', getReviews)

router.get('/search/:query', searchMovies)

export default router;