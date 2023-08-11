import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { useAppSelector } from '../../hooks/hooks'
import { CommentItem, ICommentItem } from './CommentItem'
import { MainItemProps } from '../../items/MainItem/MainItem'

interface Item {
  id: string
  imageUrl: string
  title: string
  price: number
  category: number
  discount: number
}

export const SingleItem = () => {

  const { currentUser } = useAppSelector(state => state.usersReducer)

  const { id } = useParams()

  const [item, setItem] = useState<Item>()
  const [comments,setComments] = useState([])


  const fetch = async () => {
    try {
      const { data } = await axios.get('https://63e0996159bb472a7424ce7b.mockapi.io/items/' + id)
      setItem(data)
      return data as Item[]
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])



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



  const feedbackSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    const advantages = (e.currentTarget[0] as HTMLFormElement).value
    const disadvantages = (e.currentTarget[1] as HTMLFormElement).value
    const feedback = (e.currentTarget[2] as HTMLFormElement).value
    const date = new Date().toLocaleDateString()

    console.log(date);



    if(advantages.length > 0 && disadvantages.length > 0 && feedback.length > 0){
      updateDoc(doc(db,"Comments",'1'),{
        itemCommentsArray:arrayUnion({
          photoURL:currentUser!.photoURL,
          displayName:currentUser!.displayName,
          id:item!.id,
          date:date,
          feedback,
          advantages,
          disadvantages
        })
      })
    }else if(advantages.length === 0 && disadvantages.length > 0 && feedback.length > 0){
      updateDoc(doc(db,"Comments",'1'),{
        itemCommentsArray:arrayUnion({
          photoURL:currentUser!.photoURL,
          displayName:currentUser!.displayName,
          id:item!.id,
          date:date,
          feedback,
          disadvantages
        })
      })
    }else if(advantages.length > 0 && disadvantages.length === 0 && feedback.length > 0){
      updateDoc(doc(db,"Comments",'1'),{
        itemCommentsArray:arrayUnion({
          photoURL:currentUser!.photoURL,
          displayName:currentUser!.displayName,
          id:item!.id,
          date:date,
          feedback,
          advantages
        })
      })
    }else if(advantages.length > 0 && disadvantages.length > 0 && feedback.length === 0){
      alert('Вы не ввели ничего в поле отзыва')
    }
    e.currentTarget.reset()

  }
  console.log(comments)
  console.log(item)
  const filteredArr = comments.filter((obj:MainItemProps) => obj.id === id) 
  return (
    <div className="wrapper">
      <div className="single">
      <div className="single__wrapper">
        <div className="single__container">
          <div className="single__items">
            <div className="single__item">
              <h1>{item?.title}</h1>
              {item?.category === 2 ? <img className='single__mouse__img' src={item?.imageUrl} /> : <img className='single__item__img' src={item?.imageUrl} alt="" /> }
            </div>
            <div className="single__carditem__wrapper">
              <div className="single__commentscount">
                <p>{filteredArr.length} отзывов</p>
              </div>
              <div className="single__carditem">
                <div className="single__card">
                  {item?.discount !== undefined && item?.discount > 0 ? 
                  <div className="single__prices">
                    <span className="single__fullprice">{item?.price} $</span>
                    <span className="single__currentprice">
                      {item && item.price - item.discount} $
                    </span>
                  </div> 
                  :
                  <div className="single__prices">
                    <span className="single__currentprice">{item?.price} $</span>
                  </div>}
                  <button className="single__cardbutton">
                    Добавить в корзину
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="single__comments">
            <h3>Отзывы пользователей</h3>
          {filteredArr.map((e:ICommentItem,i:number) => <CommentItem key={i} {...e} />)}

            <h2>Напишите свой отзыв</h2>
            <form onSubmit={feedbackSubmit}>
              <input type="text" placeholder='Преимущества' />
              <input type="text" placeholder='Недостатки' />
              <input type="text" placeholder='Ваш отзыв' />
              <button>Разместить отзыв</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    
  )
}
