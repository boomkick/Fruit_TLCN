import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            let newItem = action.payload
            let items = [...state.items]

            items.unshift(newItem)
            state.items = [...items]

        },
        removeItem: (state, action) => {
            const slugDel = action.payload
            state.items = state.items.filter(item => item.slug !== slugDel)
        },

        removeAll: (state, action) => {
            state.items = []
        }
    }
})

export const {
    addItem,
    removeItem,
    removeAll,
} = searchSlice.actions

export default searchSlice.reducer
