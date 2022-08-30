import React from 'react';
import { Link } from 'react-router-dom';
import {useFavoriteContext} from '../contexts/favoriteContext'



function Navbar() {
  const {favorites} = useFavoriteContext();

  return (
    <div className='navbar'>
      <div className='navbar__left'>
        
        <Link to='/'><h2>Bookgram</h2></Link>
      </div>


      <div className='navbar__right'>
        <Link to='/favorites'><h2> My Readings {favorites.length > 0 ? <span>({favorites.length})</span> : <span></span>} </h2></Link>
      </div>
    </div>
  );
}

export default Navbar;
