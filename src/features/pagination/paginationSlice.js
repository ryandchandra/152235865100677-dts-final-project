import { createSlice } from '@reduxjs/toolkit';

const initialState = { page: 1 };

const paginationSlice = createSlice({
    name: "pagination",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.page = 1;
        },
        setPage : (state, action) => {
            state.page = action.payload;
        }
    }
})

export const { reset, setPage } = paginationSlice.actions;

// selector
export const selectPage = (state) => state.pagination.page;

export default paginationSlice.reducer;
