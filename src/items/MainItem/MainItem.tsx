import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/hooks'
import heartSvg from '../../assets/heart.svg'
import heartActiveSvg from '../../assets/heartActive.svg'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { Link } from 'react-router-dom'
import cartSvg from '../../assets/cartMain.svg'

export type MainItemProps = {
  id: string
  imageUrl: string
  title: string
  price: number
  category: number
  discount: number
  count:number
}

export const MainItem: React.FC<MainItemProps> = ({id,imageUrl,title,price,category,discount}) => {

  const [comments,setComments] = useState([])

  const getComments = async() =>{
    const docSnap = await getDoc(doc(db,"Comments",'1'))
    if(docSnap.exists()){
      onSnapshot(doc(db,"Comments",'1'),(doc) =>{
        setComments(doc.data()?.itemCommentsArray as [])
      })
    }
  }
  useEffect(() =>{
    getComments()
  },[])


  const { currentUser } = useAppSelector((state) => state.usersReducer)

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

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


  const isFavourite = favouritesArray.find((obj:MainItemProps) => obj.id === id)


    const addItemToCart = async () => {

      setIsButtonDisabled(true)

      const docSnap = await getDoc(doc(db, 'userCartItems', currentUser!.uid))
  
      if (docSnap.exists()) {
        const cartArr = docSnap.data().cartArray
        
        const findItem = cartArr.find((obj: MainItemProps) => obj.id === id)


        if (findItem) {
          findItem.count += 1
          updateDoc(doc(db, 'userCartItems', currentUser!.uid), {
            cartArray: [...cartArr],
          })
        }else{
          updateDoc(doc(db, 'userCartItems', currentUser!.uid), {
            cartArray: arrayUnion({
              id,
              imageUrl,
              title,
              price,
              category,
              discount,
              count: 1,
            }),
          })
        }
  
        console.log(cartArr)
        console.log(findItem)
        setIsButtonDisabled(false)
      }
    }

  const addItemToFavorite = async() => {

    const docSnap = await getDoc(doc(db,"userFavouritesItems",currentUser!.uid))

    if(docSnap.exists()){

      const favouritesArr = docSnap.data().favouritesArray
      console.log(favouritesArr);
      

      const findItem = favouritesArr.find((obj:MainItemProps) => obj.id === id)

      if(findItem){
        const filteredArray = favouritesArr.filter((obj:MainItemProps) => obj.id !== id)
        updateDoc(doc(db,"userFavouritesItems",currentUser!.uid),{
          favouritesArray: filteredArray
        })
    }else{
      updateDoc(doc(db, 'userFavouritesItems', currentUser!.uid), {
        favouritesArray: arrayUnion({
          id,
          imageUrl,
          title,
          price,
          category,
          discount,
          count:1
        }),
      })
    }
  }
}
const filteredArr = comments.filter((obj:MainItemProps) => obj.id === id) 
  return (
    <div className="item-block">
      <div className="item-block__items">
        <div onClick={addItemToFavorite} className="item-block__favourites">
          {isFavourite ? (
            <img src={heartActiveSvg} alt="heart" />
          ) : (
            <img src={heartSvg} alt="heart" />
          )}
        </div>
        <Link to={`single/${id}`}>
          <img className="item-block__image" src={imageUrl} alt="image" />
          <h4 className="item-block__title">{title}</h4>
        </Link>
        {[2,3,4,22,23,24,32,33,34,42,43,52,53,54,62,63,64,72,73,74,82,83,84,92,93,94].includes(filteredArr.length) && 
        <div className="item-block__comments">
          ({filteredArr.length} отзыва)
        </div>}
        {[1,21,31,41,51,61,71,81,91].includes(filteredArr.length) && 
        <div className="item-block__comments">
          ({filteredArr.length} отзыв)
        </div>}
        {[0,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,25,26,27,28,29,30,35,36,37,38,39,
        40,45,46,47,48,49,50,55,56,57,58,59,60,65,66,67,68,69,70,75,76,77,78,79,80,85,86,87,88,89,90,95,96,97,98,99,100].includes(filteredArr.length) && 
        <div className="item-block__comments">
          ({filteredArr.length} отзывов)
        </div>}
        <div className="item-block__bottom">
          <div className="item-block__pricewrapper">
            {discount > 0 && (
              <div>
                <div className="item-block__strikeprice">{price}$</div>
                <div className="item-block__price">{price - discount} $</div>
              </div>
            )}
            {discount === 0 && (
              <div className="item-block__price">{price} $</div>
            )}
          </div>
          <button onClick={addItemToCart} className="button button--outline button--add" disabled={isButtonDisabled}>
            <span>Добавить</span>
            <img src={cartSvg} className='item-block__button' />
          </button>
        </div>
      </div>
    </div>
  )
}
