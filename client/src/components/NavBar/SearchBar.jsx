import { useState } from "react";


export default function SearchBar({onSearch}) {
   const [raza, setRaza] = useState("");

   function handleChange(event){
      setRaza(event.target.value);
   }
    return (
       <div>
          <input onChange={handleChange} type='search' name='search' value={raza}/>
          <button onClick={()=>onSearch(raza)}>Agregar</button>
       </div>
    );
 }
 