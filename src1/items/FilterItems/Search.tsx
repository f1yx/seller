import React from "react"
import debounce from 'lodash.debounce'
import { setInputValue } from "../../redux/slices/filterSlice"
import { useAppDispatch } from "../../hooks/hooks"
import svg from '../../assets/x-symbol-svgrepo-com.svg'

export const Search = () => {
    const dispatch = useAppDispatch()
    const [value,setValue] = React.useState('')
   const debounceValue = React.useCallback(
    debounce(targetValue =>{
        dispatch(setInputValue(targetValue))
    },1000)
    ,[])
   const onChangeValue = (event:React.ChangeEvent<HTMLInputElement>) =>{
    debounceValue(event.target.value)
    setValue(event.target.value)
   }
   const clearInput = () =>{
    setValue('')
    dispatch(setInputValue(''))
   }
  return (
    <div className="header__search">
        <input type="text" placeholder="Поиск товара" onChange={onChangeValue} value={value} />
       {value && <button onClick={clearInput}><img src={svg}/></button>} 
    </div>
  )
}

