import React from 'react'

export default function Card({img, name, temperaments, weight, onClose}) {
  return (
    <div>Card
        <button style={{cursor: 'pointer'}} onClick={()=>onClose(name)}>X</button>
        <h2>Raza: {name}</h2>
        <h3>Temperamento: {temperaments}</h3>
        <h3>Peso en kg: {weight}</h3>
        <img className='img' src={img} alt={name}></img>
    </div>
  )
}
