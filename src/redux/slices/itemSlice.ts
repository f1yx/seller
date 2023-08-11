import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { useAppSelector } from "../../hooks/hooks";
import { db } from "../../firebase/firebase";
import { User } from "firebase/auth";


interface Item{
  id:string
  imageUrl:string
  title:string
  price:number
  category:string
  discount:number
}
interface Iinitial{
  items:Item[],
  status: Estatus
}

enum Estatus{
  IDLE = 'idle',
  LOADING = 'loading',
  PENDING = 'pending',
  FULLFIELD = 'fullfield',
  REJECTED = 'rejected'
}
type fetchParams = {
  categories:string
  inputVal:string
  currentUser:User|null
  order:string
  sortBy:string
}


export const fetchItems = createAsyncThunk(
  'item/fetchItemsStatus',
  async (params:fetchParams) => {

    const {categories,inputVal,currentUser,order,sortBy} = params
    const {data} = await axios.get(`https://63e0996159bb472a7424ce7b.mockapi.io/items?${categories}&${inputVal}&order=${order}&sortBy=${sortBy}`)

    setDoc(doc(db,"items",currentUser!.uid),{
      itemArray: data
    })
    
    return data as Item[]
  }
)
const initialState:Iinitial = {
  items:[],
  status:Estatus.IDLE
}

const itemSlice = createSlice({
  name:'item',
  initialState,
  reducers:{},

  extraReducers:(builder =>{
    builder
    .addCase(fetchItems.pending,(state) =>{
      state.items = [],
      state.status = Estatus.PENDING
    })
    .addCase(fetchItems.fulfilled,(state,action:PayloadAction<Item[]>) =>{
      state.items = action.payload
      state.status = Estatus.PENDING
    })
    .addCase(fetchItems.rejected,(state) =>{
      state.items = []
      state.status = Estatus.REJECTED
    })
  })
})

export default itemSlice.reducer