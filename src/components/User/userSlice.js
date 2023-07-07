import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
    loading: true,
    data: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        removeUser: (state, action) => {
            state.data = action.payload
        },
        updateUser: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const getUser = createAsyncThunk('auth/getUser', async () => {
    try {
        const response = await api.get('/users/me');
        return response.data.user;
    } catch (error) {
        throw error;
    }
});

export const { removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;