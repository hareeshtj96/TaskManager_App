import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    SIGNUPUSER,
    VERIFYOTP,
} from '../../Services/userApi';


// Async thunk for user signup
export const signupUser = createAsyncThunk("user/signupUser", async (userData, thunkAPI) => {
    try {
        const response = await axios.post(SIGNUPUSER, userData);
        console.log('response from signup slice:', response);

        localStorage.setItem('signupToken', response.data.token);

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "An error occured during sign up";
        return thunkAPI.rejectWithValue(message);
    }
})


export const verifyOtp = createAsyncThunk("user/otpUser", async (otpData, thunkAPI) => {
    try {
        const token = localStorage.getItem('signupToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post(VERIFYOTP, otpData, config);
        console.log('Response from OTP verification slice:', response);

        if (response.data.status) {
            localStorage.removeItem('signupToken');
            return response.data;
        } else {
            return thunkAPI.rejectWithValue(response.data.message);
        }

    } catch (error) {
        const message = error.response?.data?.message || "An error occurred during OTP verification";
        return thunkAPI.rejectWithValue(message);
    }
});

// Initial state
const initialState = {
    user: null,
    loading: false,
    error: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        logout: (state) => {
            localStorage.removeItem('sigupToken');
            state.user = null;
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;