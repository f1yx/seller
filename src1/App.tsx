import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import { Home } from './pages/HomePage/Home'
import { Cart } from './pages/CartPages/Cart'
import { Favourites } from './pages/FavouritesPages/Favourites'
import { Register } from './pages/RegistrationPages/Register'
import { Login } from './pages/RegistrationPages/Login'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { useEffect } from 'react'
import { fetchCurrentUser } from './redux/slices/usersSlice'
import { Users } from './pages/UserPage/Users'
import { SingleItem } from './pages/SinglePage/SingleItem'

const App = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.usersReducer)

  useEffect(() => {
    dispatch(fetchCurrentUser())
    console.log(currentUser)
  }, [])

  if (currentUser) {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<Users />} />
          <Route path="/single/:id" element={<SingleItem />} />
          <Route path="*" element={<Users />} />
        </Routes>
    )
  } else {
    return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Register />} />
        </Routes>
    )
  }
}

export default App
