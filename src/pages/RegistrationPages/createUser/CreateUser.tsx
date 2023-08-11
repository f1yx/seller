import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { arrayUnion, doc, setDoc } from 'firebase/firestore'
import { Dispatch, SetStateAction } from 'react'
import { storage, auth, db } from '../../../firebase/firebase'

interface Iparams {
  email: string
  password: string
  img: File | null
  displayName: string
  dateOfBirth: null | string
  setErr: Dispatch<SetStateAction<boolean>>
}

export const createUser = async (params: Iparams) => {
  const { email, password, img, displayName,dateOfBirth, setErr } = params

  let defaultImgUrl = 'https://winnote.ru/wp-content/uploads/2016/01/1454222417_del_recent_avatar1.png'

  //Create user
  const res = await createUserWithEmailAndPassword(auth, email, password)
  const date = new Date().getTime()
  const storageRef = ref(storage, `${displayName + date}`)

  // Upload profile image and update profile
  try {
    let downloadURL = defaultImgUrl

    if (img) {
      await uploadBytesResumable(storageRef, img)
      downloadURL = await getDownloadURL(storageRef)
    }

    await updateProfile(res.user, {
      displayName,
      photoURL: downloadURL,
    })

    // Create user on firestore
    await setDoc(doc(db, 'users', res.user.uid), {
      uid: res.user.uid,
      displayName,
      email,
      photoURL: downloadURL,
      dateOfBirth
    })

    // Create empty cartItems collection
    await setDoc(doc(db,'userCartItems',res.user.uid),{
      cartArray:arrayUnion()
    })
    
    // Create empty FavouritesItems collection
    await setDoc(doc(db,'userFavouritesItems',res.user.uid),{
      favouritesArray:arrayUnion()
    })

  } catch (err) {
    setErr(true)
  }
}
