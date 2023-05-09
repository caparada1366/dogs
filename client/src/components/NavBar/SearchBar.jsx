import { useState } from "react";


export default function SearchBar({onSearch, onTodos}) {
   const [raza, setRaza] = useState("");

   function handleChange(event){
      setRaza(event.target.value);
   }
   function handlePressEnter(event){
      if(event.keyCode ===13){
         onSearch(raza)
      }
   }
    return (
       <div>
          <input onChange={handleChange} onKeyDown={handlePressEnter} type='search' name='search' value={raza}/>
          <button onClick={()=>onSearch(raza)}>Buscar</button>
          <button onClick={()=>onTodos()}>Todos</button>
       </div>
    );
 }
 