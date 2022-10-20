import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        coupon: null,
        address:null
    },
    reducers: {
        setCoupon: (state, action) => {
            state.coupon = action.payload
        },
        setAddress: (state, action) => {
            state.address = action.payload
        },
        clearCoupon: (state) => {
            state.coupon = null
        },
        clearAddress: (state) => {
            state.address = null
        },
    }
})


export const {
    setCoupon,
    setAddress,
    clearCoupon,
    clearAddress
} = paymentSlice.actions


export default paymentSlice.reducer