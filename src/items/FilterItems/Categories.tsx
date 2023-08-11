import React from 'react'
import towerSvg from '../../assets/computer-tower.png'
import keyboardSvg from '../../assets/keyboard.svg'
import tvSvg from '../../assets/tv.svg'
import processorSvg from '../../assets/processor-svgrepo-com.svg'
import laptopSvg from '../../assets/laptop-svgrepo-com.svg'
import mouseSvg from '../../assets/mouse.svg'
import memorySvg from '../../assets/memory-computer-svgrepo-com.svg'
import motherboardSvg from '../../assets/motherboard-svgrepo-com.svg'
import videocardSvg from '../../assets/video-card-svgrepo-com.svg'
import allSvg from '../../assets/all-svgrepo-com.svg'

type CategoriesProps = {
  category:number,
  onClickCategory:(i:number) => void
}
type Telement={
  category:string
  path:string
}

export const Categories:React.FC<CategoriesProps> = ({category,onClickCategory}) => {

    const list = [
      {category:'Все',path:allSvg},
      {category:'Телевизоры',path:tvSvg},
      {category:'Мыши',path:mouseSvg},
      {category:'Клавиатуры',path:keyboardSvg},
      {category:'Карты памяти',path:memorySvg},
      {category:'Материнские платы',path:motherboardSvg},
      {category:'Видеокарты',path:videocardSvg},
      {category:'Процессоры',path:processorSvg},
      {category:'Корпуса',path:towerSvg},
      {category:'Ноутбуки',path:laptopSvg}
    ]

  return (
    <div className="categories">
      <ul>
        {list.map((e:Telement,i:number) =><li onClick={() => onClickCategory(i)} className={i === category ? 'active' : '' } key={i}> <img src={e.path}/> <span>{e.category}</span></li>)}
      </ul>
    </div>
  )
}
