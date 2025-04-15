
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAxiosInstance from "../utils/adminAxiosInstance.js";

// Create async thunk for admin login
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await adminAxiosInstance.post("/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create admin slice
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    clearAdmin: (state) => {
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;
