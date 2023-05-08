import './App.css';
import {useLocation, Routes, Route, useNavigate} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import LandingP from './components/LandingPage/landingP';
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form'
import CardContainer from './components/CardContainer/CardContainer';
import { useState } from 'react';
import axios from 'axios'


function App() {

  const location = useLocation();
  const navigate = useNavigate();

  function initialDogsState(){
    var firstDogs =[];
    
      axios.get(`http://localhost:3001/dogs`).then(({data})=>{
        if(data){
          for(let i=1; i<11; i++){
          firstDogs.push(data[i])
          }
        }
      })
    
    return firstDogs;
  }

  const[dogs, setDogs] = useState(initialDogsState());


//función para buscar la raza 
  function onSearch(raza){
    axios.get(`http://localhost:3001/dogs?name=${raza}`).then(({data})=>{
      console.log(data)
      if(data) {
        let existe = dogs.find((dog)=>dog.name === data.name);
        if(existe){
          alert('Esta raza ya existe')
        }else{
          setDogs((dogs)=>[...dogs, data]);
          
        }
      } 
    }).catch(err =>{
      window.alert(`No se encontró raza con el nombre ${raza}`)
    });
  }
  //Funcion para borrar una carta del contenedor de cartas 
  function onClose(name){
    setDogs((oldDogs)=>{
      return oldDogs.filter((dg)=>dg.name !==name)
    })
  }

  // Funcion que nos lleva al Home desde el landing page 
  function onClick(){
    navigate('/home')
  }
  return (
    <div className="App">

     {location.pathname === '/' ? <LandingP onClick ={onClick}></LandingP>  : <NavBar onSearch ={onSearch}></NavBar>}
      <Routes>
        <Route path="/home" element={<CardContainer onClose={onClose}/>}></Route>
        <Route path="/form" element={<Form/>}></Route>
        <Route path="/detail" element={<Detail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
