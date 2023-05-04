import './App.css';
import {useLocation, Routes, Route, useNavigate} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import LandingP from './components/LandingPage/landingP';
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form'
import CardContainer from './components/CardContainer/CardContainer';

function App() {

  const location = useLocation();

  function onSearch(id){

  }
  return (
    <div className="App">
     {/* <NavBar></NavBar>
     <LandingP></LandingP>  */}
     {location.pathname === '/' ? <LandingP></LandingP>  : <NavBar></NavBar>}
      <Routes>
        <Route path="/home" element={<CardContainer/>}></Route>
        <Route path="/form" element={<Form/>}></Route>
        <Route path="/detail" element={<Detail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
