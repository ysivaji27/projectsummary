import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from "../../api/axios";
// Load token from localStorage (if present)
const token = localStorage.getItem('token') || null;

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      //const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
      return response.data.token;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token,
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
