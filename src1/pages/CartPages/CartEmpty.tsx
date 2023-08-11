import React from 'react'
import emptylogo from '../../assets/emtycart.png'
import { Link } from 'react-router-dom'

export const CartEmpty = () => {
  return (
    <div className="wrapper">
      <div className="content">
        <div className="container container--cart">
          <div className="cart cart--empty">
            <img src={emptylogo} alt="Empty cart" />
            <h2>Ваша корзина пуста</h2>
            <br />
            <Link to="/" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
