import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase/firebase'
import { User, onAuthStateChanged, signOut,updateEmail, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import inputSvg from '../../assets/x-symbol-svgrepo-com.svg'
import editSvg from '../../assets/edit.svg'
import mapSvg from '../../assets/map.svg'
import userSvg from '../../assets/user.svg'
import feedbackSvg from '../../assets/feedback.svg'
import exitSvg from '../../assets/exit.svg'
import { Header } from '../HeaderPage/Header'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { fetchCurrentUser } from '../../redux/slices/usersSlice'


export interface IData{
  dateOfBirth: string
  displayName:string
  email:string
  photoURL:string
  uid:string
}
export const Users = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { currentUser } = useAppSelector((state) => state.usersReducer)

  const [data ,setData] = useState<IData>()

  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const togglePopUp = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() =>{
    dispatch(fetchCurrentUser())
  },[])



  const setDateAndEmail = async () => {
    const docSnap = await getDoc(doc(db, "users", currentUser!.uid));
    if (docSnap.exists()) {
      
        onSnapshot(doc(db, "users", currentUser!.uid), (doc) => {
          setData(doc.data() as IData)
       })
      
      
    }  
  }
  console.log(currentUser?.uid);
  useEffect(() =>{
    if(currentUser?.uid){
      setDateAndEmail()
    }
  },[currentUser])

  const updateUserValues = async(e:React.FormEvent<HTMLFormElement>) =>{
    
    e.preventDefault()

    const displayName = (e.currentTarget[0] as HTMLInputElement).value
    const dateOfBirth = (e.currentTarget[1] as HTMLInputElement).value
    const UserRef = doc(db, "users", currentUser!.uid);
    try {
      if(displayName.length > 0 && dateOfBirth.length > 0){
        await updateDoc(UserRef, {
          displayName,
          dateOfBirth
        })
        updateProfile(currentUser as User , {
          displayName:displayName
        })
        const docSnap = await getDoc(UserRef);
    
        if (docSnap.exists()) {
          onSnapshot(doc(db, "users", currentUser!.uid), (doc) => {
            setData(doc.data() as IData)
         })
        }
      }else if(displayName.length === 0 && dateOfBirth.length > 0){
        await updateDoc(UserRef, {
          dateOfBirth
        })
        const docSnap = await getDoc(UserRef);
    
        if (docSnap.exists()) {
          onSnapshot(doc(db, "users", currentUser!.uid), (doc) => {
            setData(doc.data() as IData)
         })
        }
      }else if(displayName.length > 0 && dateOfBirth.length === 0){
        await updateDoc(UserRef, {
          displayName
        })
        const docSnap = await getDoc(UserRef);
    
        if (docSnap.exists()) {
          onSnapshot(doc(db, "users", currentUser!.uid), (doc) => {
            setData(doc.data() as IData)
         })
        }
      }else{
        alert('вы должны ввести имя либо дату рождения для смены данных')
        setIsOpen(true)
      }
    

    }catch (error) {
      console.error(error)
    }
    setIsOpen(!isOpen)
  }

  const LogOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/register')
      })
      .catch((error) => {
        console.error(error)
      })
  }
  console.log(data);
  
  return (
    <div className="wrapper">
      <div className="wrapper__container">
        <Header />
        <div className="block__wrapper">
          <div className="user">
          <div className="user__info">
            <h3>Личный кабинет</h3>
            <img src={data?.photoURL} alt="Фото" />
            <div className="span__wrapper">
              <p>Имя: <span>{data?.displayName}</span></p>
              <p>Email: <span>{data?.email}</span></p>
              <p>Дата рождения: <span>{data?.dateOfBirth}</span> </p>
            </div>
            <p className="user__edit" onClick={togglePopUp}>
              <img src={editSvg} />
              Редактировать личные данные
            </p>
            <button className="user__button" onClick={() => LogOut()}>
              Выйти из аккаунта
            </button>
          </div>
          {isOpen && (
            <div className="popup-bg">
              <div className="popup">
                <div className="popup__container">
                  <div className="popup__wrapper">
                    <div className="popup__header">
                      <h2>Редактировать личные данные</h2>
                      <img src={inputSvg} onClick={togglePopUp} />
                    </div>
                    <form onSubmit={updateUserValues}>
                      <span>Ваше Имя</span>
                      <input type="text" placeholder="Имя" />
                      <span>Ваша дата рождения</span>
                      <input type="date" onKeyDown={(e) => e.preventDefault()} placeholder="Дата рождения" />
                      <button>Сохранить Изменения</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}
