import { createSlice } from '@reduxjs/toolkit';
import { activateMovieById, activateMovies, addcarousel, addCast, addMovie, addRoles, deactivateMovie, deleteCarousel, deleteCast, deleteMovie, deleteMultipleMovies, deleteRole, disableMovies, editMovie, editRolebyId, getCarousel, getCastCount, getCasts, getMovieById, getMovies, getMoviesCount, getRatingCount, getReviews, getRole, getRoles, getUserCount, getUsers, movieGraph, searchMovies, suspendUser, userGraph } from '../thunk/adminThunk';

interface Role {
  url: string;
  _id: string;
  name: string;
}

interface Movie {
  image: string;
  _id: string;
  title: string;
  desc: string;
  trailer: string;
  year: string | number;
  runtime: string;
  genre: string[];
  active: boolean;
  rate: number;
  rateCount: number;
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

interface Users {
 _id: string;
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
  isSuspended: boolean;
  authType: string;
}

interface Carousel {
      id: string,
      movieId: string,
      title: string,
      image: string,
      rate: number,
      rateCount: number
}

interface Cast {
  id: string;
  role: string;
  person: string;
  image: string;
  char_name: string;
}

interface key{
  month: string,
  count: number
}


interface AdminState {
  roles: Role[]; // Now using 'roles' (plural) instead of 'role'
  loading: boolean;
  error: string | null;
  role: Role
  movies: Movie[]
  movie: Movie
  cast: Cast[]
  carousel: Carousel[]
  userCount: number
  movieCount: number
  rateCount: number
  castCount: number
  users: Users[]
  usergraph: key[]
  moviegraph: key[]
  review: Review[]
  search: Movie[]
}

const initialState: AdminState = {
  roles: [], // Initializing with an empty array
  role: {
    url: '',
    _id: '',
    name: '',
  },
  movies: [],
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
  carousel: [],
  userCount: 0,
  movieCount: 0,
  rateCount: 0,
  castCount: 0,
  users: [],
  usergraph: [],
  moviegraph: [],
  review: [],
  search: [],
  loading: false,
  error: null,

};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.roles = state.roles.concat(action.payload.image); // Add the new role to the existing roles array
      })
      .addCase(addRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.roles; // Update the roles state with the fetched roles
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state,action) => {
        state.loading = false;
        state.roles = state.roles.filter(role => role._id !== action.payload.roleId);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(getRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload.role; // Update the role state with the fetched role
      })
      .addCase(getRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(editRolebyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editRolebyId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Correctly update the role in the roles array using action.payload
        state.roles = state.roles.map(role => {
          return role._id === action.payload.role._id ? action.payload.role : role;
        });  
      })
      .addCase(editRolebyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state,action) => {
        state.loading = false;
        state.movies = state.movies.concat(action.payload.movie); // Add the new role to the existing roles array
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
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
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state,action) => {
        state.loading = false;
        state.movies = state.movies.filter(movies => movies._id !== action.payload.movieId);
      })
      .addCase(deleteMovie.rejected, (state, action) => {
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
      .addCase(editMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.movies = state.movies.map(movie => {
          return movie._id === action.payload.movie._id ? action.payload.movie : movie;
        });  
        state.movie = action.payload.movie;
      })
      .addCase(editMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(deleteMultipleMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleMovies.fulfilled, (state, action) => {
        state.loading = false;
        // Filter out the movies whose _id is in the movieIds list
          state.movies = state.movies.filter(movie => 
          !action.payload.ids.includes(movie._id)
        );
      })
      .addCase(deleteMultipleMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(disableMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(disableMovies.fulfilled, (state, action) => {
        state.movies = state.movies.map(movie => {
          // Check if the movie's ID is in the list of IDs to disable
          if (action.payload.ids.includes(movie._id)) {
            return { ...movie, active: false }; // Update the `active` property
          }
          return movie; // Leave other movies unchanged
        });
      })
      .addCase(disableMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(activateMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.movies = state.movies.map(movie => {
          // Check if the movie's ID is in the list of IDs to disable
          if (action.payload.ids.includes(movie._id)) {
            return { ...movie, active: true }; // Update the `active` property
          }
          return movie; // Leave other movies unchanged
        }); 
      })
      .addCase(activateMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(activateMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.movies = state.movies.map(movie => {
          return movie._id === action.payload.movie._id ? action.payload.movie : movie;
        });  
        state.movie = action.payload.movie;
      })
      .addCase(activateMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })

      .addCase(deactivateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.movies = state.movies.map(movie => {
          return movie._id === action.payload.movie._id ? action.payload.movie : movie;
        });  
        state.movie = action.payload.movie;
      })
      .addCase(deactivateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(addCast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCast.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cast = state.cast.concat(action.payload.data)
      })
      .addCase(addCast.rejected, (state, action) => {
        state.loading = false;
        state.cast = [];
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
      .addCase(deleteCast.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCast.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
       state.cast = state.cast.filter((cast) => cast.id !== action.payload.id);
      })
      .addCase(deleteCast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(addcarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addcarousel.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.carousel = state.carousel.concat(action.payload.data)
      })
      .addCase(addcarousel.rejected, (state, action) => {
        state.loading = false;
        state.cast = [];
        state.error = action.payload as string; // Ensure error is typed correctly
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
      .addCase(getUserCount.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userCount = action.payload.count;
      })
      .addCase(getUserCount.rejected, (state, action) => {
        state.loading = false;
        state.userCount= 0
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(getMoviesCount.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getMoviesCount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.movieCount = action.payload.count;
      })
      .addCase(getMoviesCount.rejected, (state, action) => {
        state.loading = false;
        state.movieCount= 0
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(getRatingCount.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getRatingCount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.rateCount = action.payload.count;
      })
      .addCase(getRatingCount.rejected, (state, action) => {
        state.loading = false;
        state.rateCount= 0
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(getCastCount.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getCastCount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.castCount = action.payload.count;
      })
      .addCase(getCastCount.rejected, (state, action) => {
        state.loading = false;
        state.castCount= 0
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(getUsers.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.users= []
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(suspendUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(suspendUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = state.users.map(user => 
          user._id === action.payload.user._id 
            ? { ...user, isSuspended: !user.isSuspended } // Toggle isSuspended
            : user // Keep other users unchanged
        );
      })
      .addCase(suspendUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(userGraph.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(userGraph.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.usergraph = action.payload.formattedData;
      })
      .addCase(userGraph.rejected, (state, action) => {
        state.loading = false;
        state.usergraph= []
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(movieGraph.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(movieGraph.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.moviegraph = action.payload.formattedData;
      })
      .addCase(movieGraph.rejected, (state, action) => {
        state.loading = false;
        state.moviegraph= []
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(deleteCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCarousel.fulfilled, (state,action) => {
        state.loading = false;
        state.carousel = state.carousel.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteCarousel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
      })
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload.reviews; // Update the role state with the fetched role
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure error is typed correctly
        state.review = []
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
  },
});

export default adminSlice.reducer;
