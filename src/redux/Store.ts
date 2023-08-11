import { configureStore,combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import itemReducer from './slices/itemSlice'
import filterReducer from './slices/filterSlice'
import usersReducer from './slices/usersSlice'


const rootReducer = combineReducers({
    itemReducer,filterReducer,usersReducer
})

const middleware = getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: false,
    thunk: true,
    })

export const store = configureStore({
    reducer:rootReducer,
    middleware: () => middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


