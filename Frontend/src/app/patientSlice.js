import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import patientAxiosInstance from "../utils/patientAxios";

const initialState = {
    user: localStorage.getItem('patient') ? JSON.parse(localStorage.getItem('patient')) : null,
    loading: false,
    isAuthenticate: false,
};


export const patientLogin = createAsyncThunk(
    'patient/login',
    async (formData = {}, { rejectWithValue }) => {
        try {
            const response = await patientAxiosInstance.post('/auth/login', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Login Failed')
        }
    }
)


export const patientRegister = createAsyncThunk(
    'patient/register',
    async (formData = {}, { rejectWithValue }) => {
        try {
            const response = await patientAxiosInstance.post('/auth/register', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'SignUp Failed');
        }
    }
);

export const logout = createAsyncThunk(
    "patient/logout",
    async (patientId, { rejectWithValue }) => {
        try {
            const response = await patientAxiosInstance.post("/auth/logout", { patientId });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
);


    const userSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(patientLogin.pending, (state) => {
                state.loading = true;
                state.isAuthenticate = false;
            })
            .addCase(patientLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticate = true;
                state.user = action.payload;
                localStorage.setItem('patient', JSON.stringify(action.payload));
            })
            .addCase(patientLogin.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticate = false;
                state.user = null;
                state.error = action.payload;
            })

            // Register cases
            .addCase(patientRegister.pending, (state) => {
                state.loading = true;
                state.isAuthenticate = false;
            })
            .addCase(patientRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticate = true;
                state.user = action.payload;
                localStorage.setItem('patient', JSON.stringify(action.payload));
            })
            .addCase(patientRegister.rejected, (state, action) => {
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
                localStorage.removeItem('patient');
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default userSlice.reducer; 
