import React from 'react'
import dogs from './dogs.jpg'
import './landingP.css'


const landingP =({onClick}) =>{

  function handleClick (event){
    onClick();
  }
  return (
    <div class='landingp'>
        <h1>Bienvenido a My Dogs</h1>
        
        <img src={dogs} alt='DOGE' style={{width: '200px', height: 'auto', cursor: 'pointer'}} onClick={handleClick} />
        <h3>Haz click en Doge para entrar</h3>
    
    </div>
  )
}

export default landingP