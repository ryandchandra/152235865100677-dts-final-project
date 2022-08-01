import { createSlice } from '@reduxjs/toolkit';

const initialState = { anchorNav: null, anchorUser: null };

const navbarSlice = createSlice({
    name: "navbar",
    initialState: initialState,
    reducers: {
        setAnchorNav: (state, action) => {
            state.anchorNav = action.payload;
        },
        setAnchorUser : (state, action) => {
            state.anchorUser = action.payload;
        }
    }
})

export const { setAnchorNav, setAnchorUser } = navbarSlice.actions;

// selector
export const selectAnchorNav = (state) => state.navbar.anchorNav;
export const selectAnchorUser = (state) => state.navbar.anchorUser;

export default navbarSlice.reducer;
