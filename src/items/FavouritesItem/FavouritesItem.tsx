import React from 'react'
import {useAppSelector } from '../../hooks/hooks'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { MainItemProps } from '../MainItem/MainItem'



export const FavouritesItem: React.FC<MainItemProps> = ({id, imageUrl, title, price, category, discount}) => {
  const { currentUser } = useAppSelector((state) => state.usersReducer)

  const addItemToCart = async () => {

    const docSnap = await getDoc(doc(db, 'userCartItems', currentUser!.uid))

    if (docSnap.exists()) {
      const findArray = docSnap.data().cartArray
      const findItem = findArray.find((obj: MainItemProps) => obj.id === id)
      if (findItem) {
        findItem.count++
        updateDoc(doc(db, 'userCartItems', currentUser!.uid), {
          cartArray: [...findArray],
        })
      } else {
        updateDoc(doc(db, 'userCartItems', currentUser!.uid), {
          cartArray: arrayUnion({
            id,
            imageUrl,
            title,
            price,
            category,
            count: 1,
            discount,
          }),
        })
      }
    }
  }

  const clearOneFavouritesItem = async () => {
    const docSnap = await getDoc(doc(db, 'userFavouritesItems', currentUser!.uid))
    if (docSnap.exists()) {
      const findArray = docSnap.data().favouritesArray
      const filteredArray = findArray.filter((obj: MainItemProps) => obj.id !== id)
      updateDoc(doc(db, 'userFavouritesItems', currentUser!.uid), {
        favouritesArray: [...filteredArray],
      })
    }
  }
  return (
    <div className="favItem-block">
      <div className="favItem-block__items">
        <div className="favItem-block__remove">
          <button onClick={clearOneFavouritesItem} className="button button--outline button--circle">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"
              />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
              />
            </svg>
          </button>
        </div>
        <img className="favItem-block__image" src={imageUrl} alt="image" />
        <h4 className="favItem-block__title">{title}</h4>
        <div className="favItem-block__bottom">
          <div className="favItem-block__pricewrapper">
            {discount > 0 && (
              <div>
                <div className="favItem-block__strikeprice">{price}$</div>
                <div className="favItem-block__price">{price - discount} $</div>
              </div>
            )}
            {discount === 0 && (
              <div className="favItem-block__price">{price} $</div>
            )}
          </div>
          <button onClick={addItemToCart} className="button button--outline button--add" >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>2</i>
          </button>
        </div>
      </div>
    </div>
  )
}
