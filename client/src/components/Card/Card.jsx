import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom';

export default function Card({img, name, temperaments, weight}) {
  return (
    <div className='card'>   
       <Link to ={`/detail/${name}`}>
        <h2>Raza: {name}</h2>
        <h3>Temperamento: {temperaments}</h3>
        <h3>Peso en kg: {weight}</h3>
        <img className='img' src={img} alt={name}></img>
        </Link>
    </div>
  )
}
