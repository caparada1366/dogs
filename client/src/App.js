import './App.css';
import {useLocation, Routes, Route, useNavigate} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import LandingP from './components/LandingPage/landingP';
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form'
import CardContainer from './components/CardContainer/CardContainer';
import { useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { searchDog, todos } from './Redux/actions';


function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const {dogs} = useSelector((state)=>state)
  const dispatch = useDispatch()


//función para buscar la raza 
  function onSearch(raza){
   dispatch(searchDog(raza))
  }

  function onTodos(){
    dispatch(todos())
  }
  //Funcion para borrar una carta del contenedor de cartas 
  // function onClose(name){
  //   setDogs((oldDogs)=>{
  //     return oldDogs.filter((dg)=>dg.name !==name)
  //   })
  // }

  // Funcion que nos lleva al Home desde el landing page 
  function onClick(){
    navigate('/home')
  }
  return (
    <div className="App">

     {location.pathname === '/' ? <LandingP onClick ={onClick}></LandingP> : <NavBar onSearch ={onSearch} onTodos={onTodos}></NavBar>}
      <Routes>
        <Route path="/home" element={<CardContainer/>}></Route>
        <Route path="/form" element={<Form/>}></Route>
        <Route path="/detail/:name" element={<Detail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
