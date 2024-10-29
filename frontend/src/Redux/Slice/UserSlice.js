import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    SIGNUPUSER,
    VERIFYOTP,
    LOGINUSER,
    ADDTASK,
    FETCHTASK,
    DRAGTASK,
    GOOGLEREGISTER,
    GOOGLELOGIN,
    UPDATETASK,
    DELETETASK
} from '../../Services/userApi.js'


// Async thunk for user signup
export const signupUser = createAsyncThunk("user/signupUser", async (userData, thunkAPI) => {
    try {
        const response = await axios.post(SIGNUPUSER, userData);

        localStorage.setItem('signupToken', response.data.token);

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "An error occured during sign up";
        return thunkAPI.rejectWithValue(message);
    }
})


// Async thunk for google register
export const googleRegister = createAsyncThunk(
    "user/googleRegister",
    async (googleUserData, thunkAPI) => {
        try {
            const response = await axios.post(GOOGLEREGISTER, googleUserData);

            const { token } = response.data;

            const base64url = token.split('.')[1];

            const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');

            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const decoded = JSON.parse(jsonPayload);

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(decoded));
            return { token, user: decoded, response };

        } catch (error) {
            const message = error.response?.data?.message || "An error occurred during Google sign-up";
            return thunkAPI.rejectWithValue(message);
        }
    }
);



// Async thunk for google login
export const googleLogin = createAsyncThunk(
    "user/googleLogin",
    async (googleUserData, thunkAPI) => {
        try {
            const response = await axios.post(GOOGLELOGIN, googleUserData);

            const { token } = response.data;

            const base64url = token.split('.')[1];

            const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');

            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const decoded = JSON.parse(jsonPayload);

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(decoded));
            return { token, user: decoded, response };

        } catch (error) {
            const message = error.response?.data?.message || "An error occurred during Google Login";
            return thunkAPI.rejectWithValue(message);
        }
    }
);



// Slice for verify otp
export const verifyOtp = createAsyncThunk("user/otpUser", async (otpData, thunkAPI) => {
    try {
        const token = localStorage.getItem('signupToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post(VERIFYOTP, otpData, config);

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

        return response.data.data;

    } catch (error) {
        const message = error.response?.data?.message || "An error occured while adding task"
        return thunkAPI.rejectWithValue(message)
    }
})

export const fetchTasks = createAsyncThunk("user/fetchTasks", async (email, thunkAPI) => {
    try {
        const response = await axios.get(`${FETCHTASK}/${encodeURIComponent(email)}`);

        const tasks = response.data.data;

        const uniqueTasks = Array.from(new Map(tasks.map(task => [task._id, task])).values());

        return uniqueTasks

    } catch (error) {
        const message = error.response?.data?.message || "An error occured while fetching task"
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateTaskStatus = createAsyncThunk(
    'user/updateTaskStatus',
    async ({ id, newStatus }, thunkAPI) => {
        try {
            const response = await axios.patch(`${DRAGTASK}/${id}/status`, { status: newStatus });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "An error occurred while updating task status";
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const deleteTask = createAsyncThunk(
    'user/deleteTask',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${DELETETASK}/${id}`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "An error occurred while deleting task status";
            return thunkAPI.rejectWithValue(message);
        }
    }
);



export const updateTask = createAsyncThunk(
    'user/updateTask',
    async ({ id, title, description }, thunkAPI) => {
        try {
            const response = await axios.patch(`${UPDATETASK}/${id}`, {
                title,
                description,
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "An error occurred while updating task";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

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
        },
        clearTasks: (state) => {
            state.tasks = [];
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
            .addCase(googleRegister.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(googleRegister.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.otpVerified = false;
            })
            .addCase(googleRegister.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(googleLogin.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.otpVerified = false;
            })
            .addCase(googleLogin.rejected, (state) => {
                state.status = 'failed';
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
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                const uniqueTasks = Array.from(new Map(action.payload.map(task => [task._id, task])).values());
                state.tasks = uniqueTasks;
                state.loading = false;
                state.error = null;
            })
    }
})



export const { logout, clearError, clearTasks } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
