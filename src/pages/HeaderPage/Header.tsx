import logo from '../../assets/seller.png'
import cartSvg from '../../assets/cart.svg'
import heartSvg from '../../assets/heart.svg'
import profileSvg from '../../assets/user.svg'
import { Search } from '../../items/FilterItems/Search'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { MainItemProps } from '../../items/MainItem/MainItem'

export const Header = () => {

  const {currentUser} = useAppSelector(state => state.usersReducer)

  const [cartItemsArray, setCartItemsArray] = useState([])
  const [favouritesItemsArray,setFavouritesItemsArray] = useState([])


  useEffect(() => {
    const getCartItem = () => {
      const unsub = onSnapshot(
        doc(db, 'userCartItems', currentUser!.uid),
        (doc) => {
          setCartItemsArray(doc.data()!.cartArray)
        }
      )
      return () => {
        unsub()
      }
    }
    currentUser!.uid && getCartItem()
  }, [currentUser!.uid])

  useEffect(() => {
    const getFavourites = () => {
      const unsub = onSnapshot(
        doc(db, 'userFavouritesItems', currentUser!.uid),
        (doc) => {
          setFavouritesItemsArray(doc.data()!.favouritesArray)
        }
      )
      return () => {
        unsub()
      }
    }
    currentUser!.uid && getFavourites()
  }, [currentUser!.uid])

  const cartTotalCount = cartItemsArray.reduce((sum:number, obj:MainItemProps) => {
    return obj.count + sum
  }, 0)

  const favouritesTotalCount = favouritesItemsArray.reduce((sum:number, obj:MainItemProps) => {
    return obj.count + sum
  }, 0)
  
  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img width="15%" height="100%" src={logo} />
          </Link>
        </div>

        <Search />
        <div className="header__wrapper">
          <div className="header__cart">
            <div className="header__elements">
            <div className="header__cartcounter">
                {cartTotalCount > 0 && (
                  <div className="header__span">
                    <span>{cartTotalCount}</span>
                  </div>
                )}
                <div className="header__element header__cartsvg">
                  <Link to="/cart">
                    <img src={cartSvg} width="35px" height="35px" alt="Корзина"/>
                  </Link>
                </div>
              </div>
              <div className="header__heartcounter">
              {favouritesTotalCount > 0 && (
                  <div className="header__span">
                    <span>{favouritesTotalCount}</span>
                  </div>
                )}
                <div className="header__element header__heartsvg">
                  <Link to="/favourites">
                    <img src={heartSvg} width="35px" height="35px" alt="Избранное"/>
                  </Link>
                </div>
              </div>
              <div className="header__profilecounter">
                <Link to="/user">
                  <div className="header__element header__profilesvg">
                      <img src={profileSvg} width="35px" height="35px" alt="Избранное"/>
                    <span>Личный кабинет</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
