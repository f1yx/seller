import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/firebase'
import { useAppSelector } from '../../hooks/hooks'

export const Login = () => { 

  const navigate = useNavigate()

  const handleLogin = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    const email = (e.currentTarget[0] as HTMLInputElement).value
    const password = (e.currentTarget[1] as HTMLInputElement).value
    
    try {
      signInWithEmailAndPassword(auth, email, password)
      setTimeout(() =>{
        navigate('/')
        location.reload()
      },3000)
      
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  }


  return (
    <div className='formContainer'>
    <div className='formWrapper'>
        <span className='logo'>Seller marketplace</span>
        <span className='title'>Login</span>
        <form onSubmit={handleLogin}>
            <input type="email" placeholder='email' />
            <input type="password" placeholder='password'/>
            <button>Log in</button>
        </form>
        <p>Havent got account already ? <Link to="/register">Register</Link></p>
    </div>
</div>
  )
}
