import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { nextPage, prevPage } from '../../Redux/actions'

export default function Paginate({cantPages}) {
    const {paginaActual} = useSelector((state)=> state);
    const dispatch = useDispatch();

    function nextP(){
        dispatch(nextPage());
    }

    function prevP(){
        dispatch(prevPage());
    }


  return (
    <div >
      {paginaActual > 1 ? (
        <div>
          <button onClick={prevP}>PREV</button>
          <p>{paginaActual - 1}</p>
        </div>
      ) : null}

      <h3>{paginaActual}</h3>
      {paginaActual < cantPages ? (
        <div>
          <p>{paginaActual + 1}</p>
          <button onClick={nextP}>NEXT</button>
        </div>
      ) : null}
    </div>
  )
}
