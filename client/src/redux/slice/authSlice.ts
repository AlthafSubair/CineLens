import {createSlice} from '@reduxjs/toolkit'
import { forgotpassword, logIn, registerUser, resendOtp, resetPassword, verifyOtp } from '../thunk/authThunk'

const initialState = {
    userId: localStorage.getItem('userid') || null,
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
    email: localStorage.getItem('email') || null,
    loading: false,
    role: localStorage.getItem('role') || null,
    error: null as unknown,
    avatar: localStorage.getItem('avatar') 
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true
            state.error = null
        },
        login(state, action) {
            const { token, username, email, role, avatar, userId } = action.payload;
        
            if(userId){
              state.userId = userId;
              localStorage.setItem('userid', userId);
          }

            if (token) {
                state.token = token;
                localStorage.setItem('token', token);
            }
        
            if (username) {
                state.username = username;
                localStorage.setItem('username', username);
            }
        
            if (email) {
                state.email = email;
                localStorage.setItem('email', email);
            }
        
            if (role) {
                state.role = role;
                localStorage.setItem('role', role);
            }

            if(avatar){
                state.avatar = avatar;
                localStorage.setItem('avatar', avatar);
            }
            
            state.loading = false;
            state.error = null;
        },
        loginFail(state, action) {
            state.loading = false
            state.error = action.payload
        },
        logout(state) {
            state.token = null
            state.username = null
            state.email = null
            state.role = null
            state.avatar = null
            state.userId = null
            state.avatar=null
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('email')
            localStorage.removeItem('role')
            localStorage.removeItem('avatar')
            localStorage.removeItem('userid')
        
    }
},
extraReducers : (builder) => {
    builder
    .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(verifyOtp.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(resendOtp.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(logIn.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(forgotpassword.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotpassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotpassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(resetPassword.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
}
})

export const {loginStart, login, loginFail, logout} = authSlice.actions
export default authSlice.reducer