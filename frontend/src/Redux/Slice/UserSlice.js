import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    SIGNUPUSER,
    VERIFYOTP,
    LOGINUSER,
    ADDTASK
} from '../../Services/userApi.js'


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


export const loginUser = createAsyncThunk('user/loginUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(LOGINUSER, userData);
        console.log("response from login slice", response);


        const { token } = response.data

        localStorage.setItem('token', token);

        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Login failed');
    }
});

export const addTask = createAsyncThunk("user/addTasks", async ({ title, description, email }, thunkAPI) => {
    try {
        const response = await axios.post(ADDTASK, { title, description, email });
        console.log("response from add task slice:", response.data.data);
        return response.data.data;

    } catch (error) {
        const message = error.response?.data?.message || "An error occured while adding task"
        return thunkAPI.rejectWithValue(message)
    }
})

// Initial state
const initialState = {
    user: null,
    loading: false,
    error: null,
    tasks: [],
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        logout: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.error = null;
            state.tasks = [];
        },
        clearError: (state) => {
            state.error = null;
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
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                if (!state.tasks) {
                    state.tasks = [];
                }

                state.tasks = [...state.tasks, action.payload];
                state.error = null;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})



export const { logout, clearError } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
