import React from 'react';
import { useSearchContext } from '../contexts/searchContext';
import { MdOutlineArrowRightAlt } from "react-icons/md";

function Search() {

  console.log('search')
  const { search, onSearchInput, SearchBook } = useSearchContext();
  
  return (
    <div className='search-wrapper'>
      {/* <div className="search-title">Find a book:</div> */}
      <div className='search'>
  
        <input
          className='search__input'
          type='search'
          placeholder='Find a book...'
          onChange={onSearchInput}
          onKeyUp={SearchBook}
          value={search}
          autoFocus
          required
        />
        
      
        <button className='search__button' onClick={SearchBook}>
          <MdOutlineArrowRightAlt fontSize='36' color="white"/>
        </button>
       
      </div>
    </div>
  );
}

export default Search;
