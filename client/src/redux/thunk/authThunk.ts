import axios from "axios";
import {createAsyncThunk} from '@reduxjs/toolkit'




const baseUrl =`https://cinelens-server.onrender.com/api`



const registerUser = createAsyncThunk('/auth/register', async(formData : {username: string, email: string, password: string}, { rejectWithValue }) =>{
    try {
        const res = await axios.post(`${baseUrl}/auth/register`, formData);
        if(res.data.success){
            return res.data;
          
        }else{
            return rejectWithValue(res.data.message || "Registration failed");
        }
    } catch (error: unknown) {
        // Cast the error to AxiosError to access response and other properties
        if (axios.isAxiosError(error)) {
          // Handle the AxiosError type
          return rejectWithValue(error.response?.data?.message || "Network error");
        }
        // If it's not an AxiosError, return a generic error message
        return rejectWithValue("An unexpected error occurred");
      }
});

const verifyOtp = createAsyncThunk('auth/verify', async(data: {email: string, otp: string}, {rejectWithValue}) => {
    try {

        const res = await axios.post(`${baseUrl}/auth/verify-otp`, data);
        if(res.data.success){
            return res.data;
        }else{
            return rejectWithValue(res.data.message || "Otp verification failed");
        }
    } catch (error: unknown) {
        // Cast the error to AxiosError to access response and other properties
        if (axios.isAxiosError(error)) {
          // Handle the AxiosError type
          return rejectWithValue(error.response?.data?.message || "Network error");
        }
        // If it's not an AxiosError, return a generic error message
        return rejectWithValue("An unexpected error occurred");
      }
})

const resendOtp = createAsyncThunk('auth/resend', async(data: {email: string}, {rejectWithValue}) => {
    try {
        const res = await axios.post(`${baseUrl}/auth/send-otp`, data);
        if(res.data.success){
            return res.data;
        }else{
            return rejectWithValue(res.data.message || "can`t send otp! please try again.");
        }
    } catch (error: unknown) {
         // Cast the error to AxiosError to access response and other properties
         if (axios.isAxiosError(error)) {
            // Handle the AxiosError type
            return rejectWithValue(error.response?.data?.message || "Network error");
          }
          // If it's not an AxiosError, return a generic error message
          return rejectWithValue("An unexpected error occurred");
    }
})

const logIn = createAsyncThunk('/auth/login',async(formData : {email: string, password: string}, { rejectWithValue }) =>{
    try {
        const res = await axios.post(`${baseUrl}/auth/login`, formData);

        if(res.data.success){
            return res.data;
        }else{
            return rejectWithValue(res.data.message || "login failed");
        }
    } catch (error: unknown) {
        // Cast the error to AxiosError to access response and other properties
        if (axios.isAxiosError(error)) {
           // Handle the AxiosError type
           return rejectWithValue(error.response?.data?.message || "Network error");
         }
         // If it's not an AxiosError, return a generic error message
         return rejectWithValue("An unexpected error occurred");
   }
})

const forgotpassword = createAsyncThunk('/auth/forgot-password', async(formData: {email: string}, {rejectWithValue})=>{
    try {
        const res = await axios.post(`${baseUrl}/auth/forgot-password`, formData);
        if(res.data.success){
            return res.data;
        }else{
            return rejectWithValue(res.data.message || "can't send otp! please try again");
        }
    } catch (error: unknown) {
        // Cast the error to AxiosError to access response and other properties
        if (axios.isAxiosError(error)) {
           // Handle the AxiosError type
           return rejectWithValue(error.response?.data?.message || "Network error");
         }
         // If it's not an AxiosError, return a generic error message
         return rejectWithValue("An unexpected error occurred");
   }
})

 const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (formData: { email: string; password: string; confirmpassword: string; otp: string }, { rejectWithValue }) => {
      try {
        const res = await axios.post(`${baseUrl}/auth/reset-password`, formData);
        if (res.data.success) {
          return res.data;
        } else {
          return rejectWithValue(res.data.message || "Couldn't reset password. Please try again.");
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.response?.data?.message || 'Network error');
        }
        return rejectWithValue('An unexpected error occurred');
      }
    }
  );

export {registerUser, verifyOtp, resendOtp, logIn, forgotpassword, resetPassword}


