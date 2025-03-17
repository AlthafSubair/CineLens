import {createSlice} from '@reduxjs/toolkit'
import { addRate, addReview, addWatchlist, deleteReview, deleteWatchlist, getCarousel, getCasts, getMovieById, getMovies, getRateById, getReviews, getWatchlist, searchMovies } from '../thunk/userThunk';


interface movie{
    image: string;
    _id: string;
    title: string;
    desc: string;
    trailer: string;
    year: string | number;
    runtime: string;
    genre: string[];
    active: boolean;
    rate: number 
    rateCount: number 
}

interface Review {
  _id: string;
  user: string;
  movie: string;
  rate: number;
  review: string;
  caption: string;
  spoiler: boolean;
  date: string | number;
  userId: string;
  username: string;
}

interface Cast {
  id: string;
  role: string;
  person: string;
  image: string;
  char_name: string;
}

interface watchlist{
  _id: string;
  userId: string;
  movieId: string;
  title: string;
  desc: string;
  image: string;
  year: string | number;
  runtime: string;
  genre: string[];
  rate: number;
  rateCount: number;
  trailer: string;
  date: string | number;
}

interface Carousel {
  id: string,
  movieId: string,
  title: string,
  image: string,
  rate: number,
  rateCount: number
  trailer: string,

}

interface userState {
    movies: movie[];
    loading: boolean;
    error: string | null;
    movie: movie | null;
    cast: Cast[] | null
    rating: number | null;
    reviews: Review[] | null
    watchlist: watchlist[]
    search: movie[]
    carousel: Carousel[]
}



const initialState: userState = {
    movies: [],
    loading: false,
    error: null,
    movie: {
        image: '',
        _id: '',
        title: '',
        desc: '',
        trailer: '',
        year: '',
        runtime: '',
        genre: [],
        active: false,
        rate: 0,
        rateCount: 0
    },
    cast: [],
    rating: null,
    reviews: [
        {
            _id: '',
            user: '',
            movie: '',
            rate: 0,
            review: '',
            caption: '',
            spoiler: false,
            date: '',
            userId: '',
            username: ''
        }
    ],
    watchlist: [],
    search: [],
    carousel: []
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setRating: (state) => {
        state.rating = null;
      }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload.movies; // Update the role state with the fetched role
          })
          .addCase(getMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; // Ensure error is typed correctly
          })
          .addCase(getMovieById.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getMovieById.fulfilled, (state,action) => {
            state.loading = false;
            state.movie = action.payload.movie;
          })
          .addCase(getMovieById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; // Ensure error is typed correctly
          })
          .addCase(getCasts.pending, (state) =>{
            state.loading = true;
            state.error = null;
          })
          .addCase(getCasts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.cast = action.payload.data;
          })
          .addCase(getCasts.rejected, (state, action) => {
            state.loading = false;
            state.cast= []
            state.error = action.payload as string; // Ensure error is typed correctly
          })
          .addCase(addRate.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addRate.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = state.movies.map(movie => {
              return movie._id === action.payload.movie._id ? action.payload.movie : movie;
            });  
            state.movie = action.payload.movie;
          })
          .addCase(addRate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; // Ensure error is typed correctly
          })
          .addCase(getRateById.pending, (state) =>{
            state.loading = true;
            state.error = null;
          })
          .addCase(getRateById.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.rating = action.payload.rate.rate;
          })
          .addCase(getRateById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; // Ensure error is typed correctly
            state.rating = null;
          })
          .addCase(addReview.pending, (state) =>{
            state.loading = true;
            state.error = null;
          })
          .addCase(addReview.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.reviews = (state.reviews || []).concat(action.payload.review);
          })
          .addCase(addReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; // Ensure error is typed correctly
          })
          .addCase(getReviews.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = action.payload.reviews; // Update the role state with the fetched role
          })
          .addCase(getReviews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; // Ensure error is typed correctly
            state.reviews = []
          })
          .addCase(deleteReview.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteReview.fulfilled, (state,action) => {
            state.loading = false;
            state.reviews = (state.reviews || []).filter(reviews => reviews._id !== action.payload.revid);
          })
          .addCase(deleteReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; // Ensure error is typed correctly
          })
          .addCase(addWatchlist.pending, (state) =>{
            state.loading = true;
            state.error = null;
          })
          .addCase(addWatchlist.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
          
          })
          .addCase(addWatchlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; // Ensure error is typed correctly
          })
          .addCase(getWatchlist.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getWatchlist.fulfilled, (state,action) => {
            state.loading = false;
            state.watchlist = action.payload.formattedWatchlist; // Update the role state with the fetched role
          })
          .addCase(getWatchlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; // Ensure error is typed correctly
            state.watchlist = []
          })
  
          .addCase(deleteWatchlist.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteWatchlist.fulfilled, (state,action) => {
            state.loading = false;
            state.watchlist = (state.watchlist || []).filter(watchlist => watchlist._id !== action.payload.watchlistId);
          })
          .addCase(deleteWatchlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; // Ensure error is typed correctly
          })
          .addCase(searchMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(searchMovies.fulfilled, (state,action) => {
            state.loading = false;
            state.search = action.payload.movies; // Update the role state with the fetched role
          })
          .addCase(searchMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; // Ensure error is typed correctly
            state.search = []
          })
          .addCase(getCarousel.pending, (state) =>{
            state.loading = true;
            state.error = null;
          })
          .addCase(getCarousel.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.carousel = action.payload.formattedCarousel;
          })
          .addCase(getCarousel.rejected, (state, action) => {
            state.loading = false;
            state.carousel= []
            state.error = action.payload as string; // Ensure error is typed correctly
          })
    }

})



export const {setRating} = userSlice.actions
export default userSlice.reducer
