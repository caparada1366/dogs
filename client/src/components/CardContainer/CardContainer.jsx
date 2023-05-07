import React from 'react'
import Card from '../Card/Card'
import './CardContainer.css'

export default function CardContainer({dogs, onClose}) {
  return (
    <div className='cards_container'>
      {
        dogs && dogs.map((dog)=>{
          return <Card key={dog.id}
          img ={dog.image}
          name ={dog.name}
          temperaments = {dog.temperament}
          weight = {dog.peso}
          onClose={onClose}>
          </Card>
        })
      }
    </div>
  )
}
