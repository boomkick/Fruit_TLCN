import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        coupon: null,
        address:null,
        paymentMethod:null,
    },
    reducers: {
        setCoupon: (state, action) => {
            state.coupon = action.payload
        },
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
        },
        clearCoupon: (state) => {
            state.coupon = null
        },
        clearAddress: (state) => {
            state.address = null
        },
        clearPaymentMethod: (state) => {
            state.paymentMethod = null
        },
    }
})


export const {
    setCoupon,
    setAddress,
    setPaymentMethod,
    clearCoupon,
    clearAddress,
    clearPaymentMethod
} = paymentSlice.actions


export default paymentSlice.reducer