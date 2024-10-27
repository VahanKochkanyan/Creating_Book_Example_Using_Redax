import { createSlice } from "@reduxjs/toolkit"
import { getBook, getBooks } from "./books.api";

const initialState = {
    list: [],
    current: null
}

const BookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getBooks.fulfilled, (state, action) => {
            state.list = action.payload            
        })
        .addCase(getBook.fulfilled, (state, action) => {
            state.current = action.payload            
        })
    }
})

export const bookReducer = BookSlice.reducer