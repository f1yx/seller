import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { User as FirebaseUser } from "firebase/auth";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { onAuthStateChanged } from 'firebase/auth'
import { auth} from '../../firebase/firebase'


enum Estatus{
  IDLE = 'idle',
  LOADING = 'loading',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}
interface IinitialState {
  currentUser: FirebaseUser | null ,
  status: Estatus
}

const initialState: IinitialState = {
  currentUser: null,
  status: Estatus.IDLE
}



export const fetchCurrentUser = createAsyncThunk<FirebaseUser>('auth/fetchCurrentUser', () => {
  return new Promise((resolve) => {
      const unsub = onAuthStateChanged(auth, (user) => {
          if (user) {
              resolve(user)
          }
          unsub()
      })
  })
})

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action:PayloadAction<FirebaseUser>) {
      state.currentUser = action.payload
    }
  },
  extraReducers:(builder =>{
    builder
    .addCase(fetchCurrentUser.pending, (state) =>{
      state.status = Estatus.PENDING
    })
    .addCase(fetchCurrentUser.fulfilled, (state,action:PayloadAction<FirebaseUser>) =>{
      state.currentUser = action.payload
      state.status = Estatus.FULFILLED
    })
    .addCase(fetchCurrentUser.rejected, (state) =>{
      state.currentUser = null
      state.status = Estatus.REJECTED
    })
  } )
})
export const { setCurrentUser } = usersSlice.actions
export default usersSlice.reducer
