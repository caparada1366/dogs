import React, { useState } from 'react'
import axios from 'axios'
import './Form.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs } from '../../Redux/actions';


export default function Form() {
  const dispatch = useDispatch();
  const {temps} = useSelector((state)=>state)

  const [raza, setRaza]= useState({
    name: "",
    image: "",
    alturaMin: "",
    alturaMax: "",
    pesoMin: "",
    pesoMax: "",
    anos_VidaMin: "",
    anos_VidaMax: "",
   
  })

  const [selectedValues, setSelectedValues] = useState([]);
  function handleChangeTemps(e){
    const {name, checked} = e.target;
    if(checked){
    setSelectedValues([...selectedValues, name])
    }else{
      setSelectedValues(selectedValues.filter(value=> value !== name));
    }
  }

  const[errors, setErrors] = useState({
    name: "",
    image: "",
    alturaMin: "",
    alturaMax: "",
    pesoMin: "",
    pesoMax: "",
    anos_VidaMin: "",
    anos_VidaMax: "",
  })

  function handleChange(e){
    setRaza({
      ...raza,
      [e.target.name]: e.target.value
    })
  }
 
  
  async function handleClickEvent(e){
    e.preventDefault();
    var alturaUnida = [raza.alturaMin, ' - ', raza.alturaMax];
    var pesoUnido = [raza.pesoMin,' - ', raza.pesoMax];
    var anosVidaUnidos = [raza.anos_VidaMin, ' - ', raza.anos_VidaMax]

    var datos = {
      name: raza.name,
      image: raza.image,
      altura: alturaUnida.join(''),
      peso: pesoUnido.join(''),
      anos_Vida: anosVidaUnidos.join(''),
      temperaments: selectedValues
    }
    try{
      const respuesta = await axios.post('http://localhost:3001/dogs', datos)
      alert('raza creada')
      dispatch(getAllDogs)
    }catch(err){
      alert(err.message)
    }
  }
  return (
    <div>
      
      <form className='form' onSubmit={handleClickEvent}>
        <label>Nombre: </label><input name='name' value={raza.name} onChange={handleChange}></input>
        {errors.name && <p style={{color: "red"}}>{errors.name}</p>} 
        <label>Imagen: </label><input name='image' value={raza.image} onChange={handleChange}></input>
        {errors.image && <p style={{color: "red"}}>{errors.image}</p>}
        <div className='minMax'>
          <label>Altura min: </label><input name='alturaMin' value={raza.alturaMin} onChange={handleChange}></input>
          {errors.alturaMin && <p style={{color: "red"}}>{errors.alturaMin}</p>}
          <label>Altura max: </label><input name='alturaMax' value={raza.alturaMax} onChange={handleChange}></input>
          {errors.alturaMax && <p style={{color: "red"}}>{errors.alturaMax}</p>}    
        </div>
        <div className='minMax'>
          <label>Peso min: </label><input name='pesoMin' value={raza.pesoMin} onChange={handleChange}></input>
          {errors.pesoMin && <p style={{color: "red"}}>{errors.pesoMin}</p>}
          <label>Peso max: </label><input name='pesoMax' value={raza.pesoMax} onChange={handleChange}></input>
          {errors.pesoMax && <p style={{color: "red"}}>{errors.pesoMax}</p>}
        </div>
        <div className='minMax'>
          <label>Años vida min: </label><input name='anos_VidaMin' value={raza.anos_VidaMin} onChange={handleChange}></input>
          {errors.anos_VidaMin && <p style={{color: "red"}}>{errors.anos_VidaMin}</p>}
          <label >Años vida max: </label><input name='anos_VidaMax' value={raza.anos_VidaMax} onChange={handleChange}></input>
          {errors.anos_VidaMax && <p style={{color: "red"}}>{errors.anos_VidaMax}</p>}
        </div>
        <div className='cuadro-checkbox'>
            {temps && temps.map((temp)=>{
              return <label> <input type='checkbox' name={temp.name} checked={selectedValues.includes(temp.name)} onChange={handleChangeTemps}/>{temp.name}</label>
          })}
        </div>
        <button type='submit'onClick={handleClickEvent}>Crear</button>                 
      </form>

    </div>
  )
}
