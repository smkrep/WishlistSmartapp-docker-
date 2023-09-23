import React from 'react'
import "../App.css"

export const AddWishButton = ({setActive}) => {
  return (
    <button className='addWishButton' onClick={() => setActive(true)}>Добавить желание</button>
  )
}