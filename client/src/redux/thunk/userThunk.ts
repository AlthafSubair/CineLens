import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const baseUrl = `https://cinelens-server.onrender.com/api`

const getMovies = createAsyncThunk('/admin/getmovies', async (_, { rejectWithValue }) => {
    try {
      console.log(baseUrl)
      const res = await axios.get(`${baseUrl}/movies`);
      console.log(res)
  
      if (res.data.success) {
  
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Fetching roles failed");
      }
  
    }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Network error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
    
  })

  const getMovieById = createAsyncThunk('/admin/getmoviebyid', async (id: string | null, { rejectWithValue }) => {
    try {
  
      const res = await axios.get(`${baseUrl}/movies/${id}`);
  
      if (res.data.success) {
  
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Fetching roles failed");
      }
    }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Network error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  })

  const getCasts = createAsyncThunk('/movie/casts', async (id : string | undefined, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/movie/cast/${id}`);
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

  const addRate = createAsyncThunk('/rate', async ({id, rate, userId}: {id: string | undefined, rate: number, userId: string | null}, { rejectWithValue, getState, }) => {
  
    try {
  
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.post(`${baseUrl}/rate/${id}`,{rate, userId},{
          headers:{
              Authorization: `Bearer ${token}`,
          }
      });
      if(res.data.success){
  
          return res.data
  
      }   else{
          return rejectWithValue(res.data.message || "Adding movie failed")   
      }
    }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Network error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  })

  const getRateById = createAsyncThunk('/getrate', async ({id,userId}: {id: string | undefined, userId: string | null}, { rejectWithValue, getState, }) => {
  
    try {
  
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.get(`${baseUrl}/rate/${userId}/${id}`,{
          headers:{
              Authorization: `Bearer ${token}`,
          }
      });
      if(res.data.success){

          return res.data
  
      }   else{
          return rejectWithValue(res.data.message || "Adding movie failed")   
      }
    }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Network error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  })

  const addReview = createAsyncThunk('/review', async ({id, userId, rate, spoiler, caption, desc}: {id: string | undefined, userId: string | null, rate: number, spoiler: boolean | null, caption: string, desc: string}, { rejectWithValue, getState, }) => {
    try {

      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.post(`${baseUrl}/review/${id}`,{userId, rate, spoiler, caption, desc},{
          headers:{
              Authorization: `Bearer ${token}`,
          }
      });
      if(res.data.success){

          return res.data

      }   else{
          return rejectWithValue(res.data.message || "Adding movie failed")   
      }
      
    }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Network error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  })

  const getReviews = createAsyncThunk('/getreview', async (id : string | undefined, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/review/${id}`);
      console.log(res.data)
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

  const deleteReview = createAsyncThunk('/deletereview', async (id : string | undefined, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      console.log(id)
      const res = await axios.delete(`${baseUrl}/review/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
      });
      if (res.data.success) {
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Deleting review failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Network error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  })

  const addWatchlist = createAsyncThunk('/watchlist', async ({movieId, userId}: {movieId: string | undefined, userId: string | null}, { rejectWithValue, getState, }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.post(`${baseUrl}/watchlist/${movieId}`,{userId},{
          headers:{
              Authorization: `Bearer ${token}`,
          }
      });
      if(res.data.success){

          return res.data
      }
      else{
          return rejectWithValue(res.data.message || "Adding movie failed")
      }
   
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Network error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  })

  const getWatchlist = createAsyncThunk('/getwatchlist', async (userId : string | null, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.get(`${baseUrl}/watchlist/${userId}`,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
      });
      if (res.data.success) {
        console.log(res.data)
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Getting watchlist failed");
      }
      }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Network error");
      }
      return rejectWithValue("An unexpected error occurred");
      }
  })

  const deleteWatchlist = createAsyncThunk('/deletewatchlist', async (watchlistId : string | undefined, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.delete(`${baseUrl}/watchlist/${watchlistId}`,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
      });

      if(res.data.success){
          return res.data
      }
    }catch(error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Network error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  })

  const searchMovies = createAsyncThunk('/searchmovies', async (search: string, { rejectWithValue}) => {
    try {

      const res = await axios.get(`${baseUrl}/search/${search}`);
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

  const getCarousel = createAsyncThunk('carosuel', async (_, { rejectWithValue}) => {
    try {
  
      const res = await axios.get(`${baseUrl}/corusel`);
  
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
  
  export {getMovies, getMovieById, getCasts, addRate, getRateById, addReview,getReviews,deleteReview, addWatchlist, getWatchlist, deleteWatchlist, searchMovies, getCarousel};
  