import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
    name: "address",
    initialState: {
        locations: null
    },
    reducers: {
        setAddress: (state, action) => {
            state.locations = action.payload
        },
    }
})


export const {
    setAddress,
} = addressSlice.actions


export default addressSlice.reducer