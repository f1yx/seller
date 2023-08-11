import {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import addAvatarSvg from '../../assets/addAvatar.png'
import { createUser } from './createUser/CreateUser'

export const Register = () => {

    const [err,setErr] = useState<boolean>(false)
    const [file,setFile] = useState<File | null>(null)

    const navigate = useNavigate()

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    const displayName = (e.currentTarget[0] as HTMLInputElement).value
    const email =(e.currentTarget[1] as HTMLInputElement).value
    const password = (e.currentTarget[2] as HTMLInputElement).value
    
    try {
        createUser({email, password, img:file,dateOfBirth:null, displayName, setErr})
        navigate('/login')
    } catch (error) {
        setErr(true)
        console.error(error);
        
    }finally{
        setTimeout(() =>{
            setErr(false)
        },5000)
    }
}


  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Seller marketplace</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='name' />
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password'/>
                <input type="file" id="file" onChange={(e:React.ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && setFile(e.target.files?.[0])}  style={{display:'none'}} />
                
                <label htmlFor="file">
                    <img src={addAvatarSvg} alt="AvatarSvg"/>
                    <span>Add avatar</span>
                </label>
                <button>Sign up</button>
            </form>
            {err && <span>Something went wrong</span>}
            <p>Already have an account ? <Link to="/login">Login</Link> </p>
        </div>
    </div>
  )
}
