

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },

        setListings:(state, action ) =>{
            state.listings = action.payload.listings;
        }
    },
});

export const { setLogin, setLogout , setListings} = authSlice.actions; // Exporting setLogout correctly

export default authSlice.reducer;
