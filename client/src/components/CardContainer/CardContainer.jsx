import React, { useEffect } from 'react'
import Card from '../Card/Card'
import './CardContainer.css'
import Paginate from './Paginate'
import { useSelector, useDispatch} from 'react-redux'
import { getAllDogs, getPerros } from '../../Redux/actions'
import axios from 'axios'

export default function CardContainer({onClose}) {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getAllDogs());
  }, [])
  
 //dispatch(getAllDogs())
  
  const {dogs} = useSelector((state)=>state)
  const {paginaActual} = useSelector((state)=>state)
  
  let desde = (paginaActual -1)* 7;
  let hasta = (paginaActual * 7)

  let cantPages = Math.floor(dogs.length /8)

  let dogsPag = dogs?.slice(desde, hasta);

  return (
    <div>
      <div className='cards_container'>
        <p>{dogs.length}</p>
        { 
          dogsPag && dogsPag.map((dog)=>{
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
      <Paginate cantPages = {cantPages}/>
    </div>
  )
}
