import React from 'react'
import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Detail() {
  const {name} = useParams();

  const [raza, setRaza]= useState({});

  useEffect(()=>{
    axios.get(`http://localhost:3001/dogs?name=${name}`).then(({data})=>{
    if (data.name){
      setRaza(data)
    }
    else{
      window.alert(`no hay personajes con el nombre ${name}`)
    }  
    }).catch(err=> err.message);
    
  },[])

  return (
    <div key={raza.name}>
      <h1>{raza.name}</h1>
      <h2>id: {raza.id}</h2>
      <h2>Altura en cm: {raza.altura}</h2>
      <h2>Peso en kg: {raza.peso}</h2>
      <h2>Años de vida: {raza.anos_Vida}</h2>
      <h2>Temperamentos: {raza.temperament}</h2> 
      <img src={raza.image} alt={raza.name}/>

    </div>
  )
}
