import React from 'react'
import SearchBar from './SearchBar'
import './NavBar.css'
import { Link } from 'react-router-dom'


export default function Nav({onSearch, logout}) {
  return (
    <div className='navbar'>
      <Link to="/home"><button className = 'button' >Home</button></Link>
      <Link to="/about"><button className = 'button' >About</button></Link>
      <Link to="/favorites"><button className = 'button' >Favorites</button></Link>
      <SearchBar className = 'searchBar' onSearch={onSearch} />
      {/* <button onClick={logout} className = 'but'>Log Out</button> */}
     
      
      
      </div>
  )
}
