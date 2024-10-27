import { createSlice } from "@reduxjs/toolkit"
import { getComments } from "./comments.api"

const initialState = {
    items: [],
}

const CommentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getComments.fulfilled, (state, action) => {
            state.items = action.payload
        })
    }
})

export const commentReducer = CommentsSlice.reducer