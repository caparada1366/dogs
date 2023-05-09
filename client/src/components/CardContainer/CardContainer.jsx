import React, { useEffect } from 'react'
import Card from '../Card/Card'
import './CardContainer.css'
import Paginate from './Paginate'
import { useSelector, useDispatch} from 'react-redux'
import { getAllDogs, filterOrigin, filterTemp, sortByName, sortByWeight, getAllTemps } from '../../Redux/actions'



export default function CardContainer({onClose}) {
  const dispatch = useDispatch();
  const {dogs} = useSelector((state)=>state)
  const {paginaActual} = useSelector((state)=>state)
  const {temps} = useSelector((state)=>state)
  
  useEffect(()=>{
    dispatch(getAllDogs())
    dispatch(getAllTemps());
  },[dispatch])

  

 //Funcion que maneja los filtros de origen 
 function handleFilterOrigin(e){
  dispatch(filterOrigin(e.target.value))
 }
//Funcion que maneja los filtros por temperamento
 function handleFilterTemp(e){
  dispatch(filterTemp(e.target.value))
 }
//Funcion que maneja el ordenamiento por nombre
 function handleSortName(e){
    dispatch(sortByName(e.target.value))
 }
//Funcion que maneja el ordenamiento por peso
 function handleSortWeight(e){
    dispatch(sortByWeight(e.target.value))
 }
  
  let desde = (paginaActual -1)* 8;
  let hasta = (paginaActual * 8)

  let cantPages = Math.ceil(dogs.length /8)

  let dogsPag = dogs?.slice(desde, hasta);

 

  return (
    <div>
      <div>
      <label for='OrdAZ'>Orden Alfabético</label>
        <select onChange={handleSortName} name='Orden Alfabetico' id='OrdAZ'>
          <option value='default'>-</option>
          <option value='AZ'>A-Z</option>
          <option value='ZA'>Z-A</option>
        </select>

        <label for='maxPeso'>Orden por peso máximo</label>
        <select onChange={handleSortWeight} name='Orden peso max' id='maxPeso'>
          <option value='default'>-</option>
          <option value='Ascendente'>Ascendente</option>
          <option value='Descendente'>Descendente</option>
        </select>
        
        <label for='filtro Origen'>Filtrar por API o DB</label>
        <select onChange={handleFilterOrigin} name='Filtrar origne' id='filtOrig'>
          <option value='default'>-</option>
          <option value='API'>API</option>
          <option value='BD'>DataBase</option>
        </select>

        <label for='filtro temps'>Filtrar temperamento</label>
        <select onChange={handleFilterTemp} name='Filtrar temp' id='filtTemp'>
        <option value='default'>-</option>
          {temps && temps.map((temp)=>{
            return <option value={temp.name}>{temp.name}</option>
          })}
        </select>
      </div>

      <div className='cards_container'>
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
