import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const baseUrl = `http://localhost:3001/api`

const addRoles = createAsyncThunk(
  "/admin/addroles",
  async (formData: FormData, { rejectWithValue, getState }) => {
    try {
      // Access token from the Redux store
      const state = getState() as RootState;
      const token = state.auth.token;

      // Make the POST request
      const res = await axios.post(`${baseUrl}/admin/addroles`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Check for success response
      if (res.data.success) {
       
        return res.data; // Return the data to the fulfilled state
      } else {
        return rejectWithValue(res.data.message || "Adding role failed");
      }
    } catch (error: unknown) {
      // Handle Axios-specific errors
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      // Handle unexpected errors
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getRoles = createAsyncThunk(
  "/admin/getroles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/admin/roles`);

      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Fetching roles failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const deleteRole = createAsyncThunk(
  "/admin/carousel/delete/:id",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.delete(`${baseUrl}/admin/role/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Deleting role failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getRole = createAsyncThunk(
  "/admin/getrole",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.get(`${baseUrl}/admin/role/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        return res.data;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const editRolebyId = createAsyncThunk(
  "/admin/editrole",
  async (
    { formData, id }: { formData: FormData; id: string | null },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.patch(
        `${baseUrl}/admin/role/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Editing role failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const addMovie = createAsyncThunk(
  "/admin/addmovie",
  async (formData: FormData, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.post(`${baseUrl}/admin/addmovie`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Adding movie failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getMovies = createAsyncThunk(
  "/admin/getmovies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/admin/movies`);

      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Fetching roles failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const deleteMovie = createAsyncThunk(
  "/admin/deletemovie",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.delete(`${baseUrl}/admin/movie/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Deleting movie failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const editMovie = createAsyncThunk(
  "/admin/editmovie",
  async (
    { formData, id }: { formData: FormData; id: string | null },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
     const token = state.auth.token;
      const res = await axios.patch(
        `${baseUrl}/admin/movie/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Editing movie failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getMovieById = createAsyncThunk(
  "/admin/getmoviebyid",
  async (id: string | null, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/admin/movie/${id}`);

      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Fetching roles failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const deleteMultipleMovies = createAsyncThunk(
  "/admin/deletemultiplemovies",
  async (ids: string[], { rejectWithValue, getState }) => {
    try {
      
      const state = getState() as RootState;
      const token = state.auth.token;

      const res = await axios.delete(`${baseUrl}/admin/moviemul/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { ids }, // Send `ids` in the body under the `data` field
      });

      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Deleting movie failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const activateMovies = createAsyncThunk(
  "/admin/activatemovies",
  async (ids: string[], { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const res = await axios.patch(
        `${baseUrl}/admin/movie/activate`,
        {
          ids,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Activating movie failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const disableMovies = createAsyncThunk(
  "/admin/deactivatemovies",
  async (ids: string[], { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const res = await axios.patch(
        `${baseUrl}/admin/movie/deactivate`,
        {
          ids,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Activating movie failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const activateMovieById = createAsyncThunk(
  "/admin/activateMovie",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const res = await axios.patch(
        `${baseUrl}/admin/movie/activatebyid/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Activating movie failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const deactivateMovie = createAsyncThunk(
  "/admin/deactivateMovie",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const res = await axios.patch(
        `${baseUrl}/admin/movie/deactivatebyid/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Deactivating movie failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const addCast = createAsyncThunk(
  "admin/addCast",
  async (
    {
      formData,
      id,
    }: { formData: { role: string; char: string; name: string }; id: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const res = await axios.post(
        `${baseUrl}/admin/movie/addcast/${id}`,
        formData, // Send formData directly without wrapping
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getCasts = createAsyncThunk(
  "/admin/movie/casts",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/admin/movie/cast/${id}`);
      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Deactivating movie failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const deleteCast = createAsyncThunk(
  "/movie/cast/delete/",
  async (id: string | undefined, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const res = await axios.delete(
        `${baseUrl}/admin/movie/cast/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        
        return res.data;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const addcarousel = createAsyncThunk(
  "/admin/carousel/add",
  async (id: string | undefined, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
 

      const res = await axios.post(`${baseUrl}/admin/carousel/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        
        return res.data;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getCarousel = createAsyncThunk('carosuel', async (_, { rejectWithValue}) => {
  try {

    const res = await axios.get(`${baseUrl}/admin/carousel`);

    if(res.data.success){

      return res.data
    }else{
      return rejectWithValue(res.data.message || "Deactivating movie failed")
    }
    
  }  catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Network error"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
})

const getUserCount = createAsyncThunk('/userCount', async (_, { rejectWithValue, getState }) => {
  try {

    const state = getState() as RootState;
    const token = state.auth.token;

    const res = await axios.get(`${baseUrl}/admin/usercount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      return res.data;
    }
  
    
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Network error"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
})

const getMoviesCount = createAsyncThunk('/moviesCount', async (_, { rejectWithValue, getState }) => {
  try {

    const state = getState() as RootState;
    const token = state.auth.token;

    const res = await axios.get(`${baseUrl}/admin/moviesCount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      return res.data;
    }
    
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Network error"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
})


const getRatingCount = createAsyncThunk('/ratingcount', async (_, { rejectWithValue, getState }) => {
  try {

    const state = getState() as RootState;
    const token = state.auth.token;

    const res = await axios.get(`${baseUrl}/admin/ratingcount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      return res.data;
    }
    
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Network error"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
})

const getCastCount = createAsyncThunk('/castcount', async (_, { rejectWithValue, getState }) => {
  try {

    const state = getState() as RootState;
    const token = state.auth.token;

    const res = await axios.get(`${baseUrl}/admin/castcount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      return res.data;
    }
    
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Network error"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
})

const getUsers = createAsyncThunk('/getusers', async (_, { rejectWithValue, getState }) => {
  try {

    const state = getState() as RootState;
    const token = state.auth.token;

    const res = await axios.get(`${baseUrl}/admin/getusers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    

    if (res.data.success) {
      return res.data;
    }
    
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Network error"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
})

const suspendUser = createAsyncThunk(
  "/admin/suspenduser",
  async (userId: string | undefined, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
  

      const res = await axios.patch(`${baseUrl}/admin/suspenduser/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        
        return res.data;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);


const userGraph = createAsyncThunk('/usergraph', async (_, { rejectWithValue, getState }) => {
  try {

    const state = getState() as RootState;
    const token = state.auth.token;

    const res = await axios.get(`${baseUrl}/admin/usergraph`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    

    if (res.data.success) {
      return res.data;
    }
    
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Network error"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
})

const movieGraph = createAsyncThunk('/moviegraph', async (_, { rejectWithValue, getState }) => {
  try {

    const state = getState() as RootState;
    const token = state.auth.token;

    const res = await axios.get(`${baseUrl}/admin/moviegraph`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (res.data.success) {
      return res.data;
    }
    
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Network error"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
})

const deleteCarousel = createAsyncThunk(
  "/admin/carousel/delete",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.delete(`${baseUrl}/admin/carousel/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Deleting role failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Network error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getReviews = createAsyncThunk('/review', async (id : string | undefined, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${baseUrl}/admin/review/${id}`);
 
    if (res.data.success) {
      return res.data;
    } else {
      return rejectWithValue(res.data.message || "Deactivating movie failed");
    }

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
    return rejectWithValue("An unexpected error occurred");
  }
})

const searchMovies = createAsyncThunk('/admin/searchmovies', async (search: string, { rejectWithValue}) => {
  try {

    const res = await axios.get(`${baseUrl}/admin/search/${search}`);
    if (res.data.success) {
      return res.data;
    }else{
      return rejectWithValue(res.data.message || "Search failed");
    }
    
  }catch(error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
    return rejectWithValue("An unexpected error occurred");
  }
})

export {
  addRoles,
  getRoles,
  deleteRole,
  editRolebyId,
  getRole,
  addMovie,
  getMovies,
  deleteMovie,
  editMovie,
  getMovieById,
  deleteMultipleMovies,
  activateMovies,
  disableMovies,
  activateMovieById,
  deactivateMovie,
  addCast,
  getCasts,
  deleteCast,
  addcarousel,
  getCarousel,
  getUserCount,
  getMoviesCount,
  getRatingCount,
  getCastCount, 
  getUsers,
  suspendUser,
  userGraph,
  movieGraph,
  deleteCarousel,
  getReviews,
  searchMovies
};
