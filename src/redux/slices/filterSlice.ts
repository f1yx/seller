import { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

 export interface IinitialState{
    category: number,
    inputValue:string,
    sortType:string
 }

const initialState:IinitialState = {
    category: 0,
    inputValue:'',
    sortType: '-price'
}

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setCategory(state,action:PayloadAction<number>){
            state.category = action.payload
        },
        setInputValue(state,action:PayloadAction<string>){
            state.inputValue = action.payload
        },setSortType(state,action:PayloadAction<string>){
            state.sortType = action.payload
        }
    }
})
export const {setCategory,setInputValue,setSortType} = filterSlice.actions
export default filterSlice.reducer