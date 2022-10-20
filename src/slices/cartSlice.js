import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addItem:(state,action)=>{
            let newItem = action.payload
            let items = [...state.items]
            const indexItem = items.findIndex(item=>item.id===newItem.id)
            if(indexItem >= 0){
                items[indexItem].quantity += newItem.quantity
            }
            else
                items.unshift(newItem)
            state.items = [...items]
        },
        removeItem:(state,action)=>{
            const itemUpdate = action.payload
            state.items = delItems(state.items,itemUpdate)
        },
        updateItem:(state,action)=>{
            const itemUpdate = action.payload
           
            const index = findIndexItem(state.items,itemUpdate)
    
            if(index>-1){
                let temp = [...state.items]
                temp[index] = {...itemUpdate}
                state.items = temp
            }
        },
        chooseAll:(state,action)=>{
            state.items= state.items.map(item=>{return {...item,choose:true}})
        },
        unchooseAll:(state,action)=>{
            state.items= state.items.map(item=>{return {...item,choose:false}})
        },
        deleteAll:(state,action)=>{
            state.items = []
        },
        deleteItemsPayment:(state,action)=>{
            state.items= state.items.filter(item=>!item.choose)
        }

    }
})

const findIndexItem = (arr,item)=>arr.findIndex(e=>e.id===item.id) 
const delItems = (arr,item)=>arr.filter(e=>e.id!==item.id)
export const {
    removeItem,
    updateItem,
    chooseAll,
    unchooseAll,
    deleteAll,
    addItem,
    deleteItemsPayment
}=cartSlice.actions

export default cartSlice.reducer