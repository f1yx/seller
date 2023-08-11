import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/hooks'
import { FavouritesItem } from '../../items/FavouritesItem/FavouritesItem'
import { Header } from '../HeaderPage/Header'
import { FavouritesEmpty } from './FavouritesEmpty'
import { doc,onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { MainItemProps } from '../../items/MainItem/MainItem'




export const Favourites = () => {
  
  const {currentUser} = useAppSelector(state => state.usersReducer)
  const [favouritesArray, setFavouritesArray] = useState([])


  useEffect(() => {
    const getFavourites = () => {
      const unsub = onSnapshot(
        doc(db, 'userFavouritesItems', currentUser!.uid),
        (doc) => {
          setFavouritesArray(doc.data()!.favouritesArray)
        }
      )
      return () => {
        unsub()
      }
    }
    currentUser!.uid && getFavourites()
  }, [currentUser!.uid])

  if (favouritesArray.length === 0) {
    return <FavouritesEmpty />
  }
  return (
    <div className="wrapper">
      <Header />
      <div className="favcontent">
        <div className="favcontainer">
          <div className="favcontainer__flex">
            <div className="favcontent__items">
              {favouritesArray.map((e:MainItemProps, i) => (
                <FavouritesItem key={i} {...e} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
