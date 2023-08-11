import { FC } from 'react'
import { useAppSelector } from '../../hooks/hooks'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { MainItemProps } from '../MainItem/MainItem'




export const CartItem: FC<MainItemProps> = ({id,imageUrl,title,price,count,category,discount}) => {

  const {currentUser} = useAppSelector(state => state.usersReducer)


  const PlusItem = async() => {
    const docSnap = await getDoc(doc(db,"userCartItems",currentUser!.uid))
    if(docSnap.exists()){
      const cartArr = docSnap.data().cartArray
      const findItem = cartArr.find((obj:MainItemProps) => obj.id === id)
      if(findItem){
        findItem.count++
        updateDoc(doc(db,"userCartItems", currentUser!.uid ),{
          cartArray: cartArr 
        })
    }
  }
}
  const MinusItem = async() => {

    const docSnap = await getDoc(doc(db,"userCartItems",currentUser!.uid))

    if(docSnap.exists()){
      const cartArr = docSnap.data().cartArray
      const index = cartArr.find((obj:MainItemProps) => obj.id === id)
      if(index){
        index.count -= 1; 
        updateDoc(doc(db,"userCartItems", currentUser!.uid ),{
          cartArray: cartArr 
        })
      }
    }
  }
  const clearOneItem = async() => {

    const docSnap = await getDoc(doc(db,"userCartItems",currentUser!.uid))

    if(docSnap.exists()){
        const cartArr = docSnap.data().cartArray
        const filteredArray = cartArr.filter((obj:MainItemProps) => obj.id !== id)
        updateDoc(doc(db,"userCartItems", currentUser!.uid),{
          cartArray:filteredArray
        })
    }
  }



  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="item-block__image" src={imageUrl} alt="item" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
      </div>
      <div className="cart__item-count">
        <button
          onClick={MinusItem}
          className="button button--outline button--circle cart__item-count-minus"
        >
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
        <b>{count}</b>
        <button
          onClick={PlusItem}
          className="button button--outline button--circle cart__item-count-plus"
        >
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
      {discount > 0 ? (
        <div className="cart__item-pricewrapper">
          <div className="cart__item-discountprice">
            <b>{price * count} $</b>
          </div>
          <div className="cart__item-price">
            <b>{price * count - discount * count} $</b>
          </div>
        </div>

        
      ) : (
        <div className="cart__item-price">
          <b>{price * count} $</b>
        </div>
      )}

      <div className="cart__item-remove">
        <button
          onClick={clearOneItem}
          className="button button--outline button--circle"
        >
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
    </div>
  )
}
