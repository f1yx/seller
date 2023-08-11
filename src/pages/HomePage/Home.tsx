import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { Categories } from '../../items/FilterItems/Categories'
import { MainItem, MainItemProps } from '../../items/MainItem/MainItem'
import { setCategory, setSortType } from '../../redux/slices/filterSlice'
import { fetchItems } from '../../redux/slices/itemSlice'
import { Header } from '../HeaderPage/Header'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import upArrow from '../../assets/up-arrow.svg'
import downArrow from '../../assets/down-arrow.svg'

export const Home = () => {

  const options = [ 
    {name:'Цене', sortProperty:'-price', img:downArrow},
    {name:'Цене', sortProperty:'price', img:upArrow},
    {name:'Алфавиту', sortProperty:'-title', img:downArrow},
    {name:'Алфавиту', sortProperty:'title', img:upArrow},
    {name:'Размеру скидки', sortProperty:'-discount', img:downArrow},
    {name:'Размеру скидки', sortProperty:'discount', img:upArrow},
  ]

  const [items, setItems] = useState([])



  const onClickCategory = (i: number) => {
    dispatch(setCategory(i))
  }

  const { category, inputValue,sortType } = useAppSelector(state => state.filterReducer)
  const { currentUser } = useAppSelector(state => state.usersReducer)
  const dispatch = useAppDispatch()

  const getItems = async () => {
    const docSnap = await getDoc(doc(db, 'items', currentUser!.uid))

    if (docSnap.exists()) {
      setItems(docSnap.data().itemArray)
    }
  }
  useEffect(() => {
    getItems()
  }, [category, inputValue,sortType])

  const inputVal = `search=${inputValue}`
  const categories = category > 0 ? `category=${category}` : ''
  const order = sortType.includes('-') ? 'asc' : 'desc'
  const sortBy = sortType.replace('-','')

  const fetchItem = () => {
    try {
      dispatch(fetchItems({ categories, inputVal, currentUser,order,sortBy }))
    } catch (error) {
      console.log(error)
      alert('товар не найден')
    }
  }

  useEffect(() => {
    fetchItem()
  }, [category, inputValue,sortType])


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="container__flex">
            <div className="content__top">
              <Categories category={category} onClickCategory={(i: number) => onClickCategory(i)}/>
            </div>
            <div className="content__sortwrapper">
              <div className="sort">
                <div className="sort__label">
                  <b>Сортировать по: </b>
                  <div className="sort__options">
                  {options.map((e,i) =><span onClick={() => dispatch(setSortType(e.sortProperty))} key={i}>{e.name}<img src={e.img}/></span>)}
                  </div>
                </div>
              </div>
              <div className="content__items">
                {items.map((e:MainItemProps, i: number) => (<MainItem key={i} {...e} />))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
