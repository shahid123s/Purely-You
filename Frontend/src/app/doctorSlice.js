import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import doctorAxiosInstance from "../utils/doctorAxiosInstance";

const initialState = {
    user: localStorage.getItem('doctor') ? JSON.parse(localStorage.getItem('doctor')) : null,
    loading: false,
    isAuthenticate: false,
};

export const doctorLogin = createAsyncThunk(
    'doctor/login',
    async (formData = {}, { rejectWithValue }) => {
        try {
            const response = await doctorAxiosInstance.post('/auth/login', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Login Failed')
        }
    }
)

export const doctorRegister = createAsyncThunk(
    'doctor/register',
    async (formData = {}, { rejectWithValue }) => {
        try {
            const response = await doctorAxiosInstance.post('/auth/register', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'SignUp Failed');
        }
    }
);

export const logout = createAsyncThunk(
    "doctor/logout",
    async (doctorId, { rejectWithValue }) => {
        try {
            const response = await doctorAxiosInstance.post("/auth/logout", { doctorId });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
);

const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(doctorLogin.pending, (state) => {
                state.loading = true;
                state.isAuthenticate = false;
            })
            .addCase(doctorLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticate = true;
                state.user = action.payload;
                localStorage.setItem('doctor', JSON.stringify(action.payload));
            })
            .addCase(doctorLogin.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticate = false;
                state.user = null;
                state.error = action.payload;
            })

            // Register cases
            .addCase(doctorRegister.pending, (state) => {
                state.loading = true;
                state.isAuthenticate = false;
            })
            .addCase(doctorRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticate = true;
                state.user = action.payload;
                localStorage.setItem('doctor', JSON.stringify(action.payload));
            })
            .addCase(doctorRegister.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticate = false;
                state.user = null;
            })

            // Logout cases
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticate = false;
                state.user = null;
                localStorage.removeItem('doctor');
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default doctorSlice.reducer;