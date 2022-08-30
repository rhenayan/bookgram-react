import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// import useLocalStorage from '../useLocalstorage';

const SearchContext = createContext();

export const useSearchContext = () => {
  const ctx = useContext(SearchContext);

  if (ctx === undefined) {
    throw new Error('The Context must be within the Provider!');
  }

  return ctx;
};

const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const fetchApi = () => {
    // eslint-disable-next-line
    let url =
      'https://www.googleapis.com/books/v1/volumes?q=search+intitle:' +
      search +
      '&key=AIzaSyBj7bEb0u65JxGlbWamxAL8mgWXlXitonw' +
      '&maxResults=40';
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw Error('could not fetch data for that resource');
        }
        return res.json();
      })
      .then(data => {
        console.log(data.items);
        setBooks(data.items);
      })
      .catch(error => {
        console.log(error.message);
      });

  };


  const onSearchInput = event => {
    setSearch(event.target.value);
  };

   
  const SearchBook = event => {
    if (event.key === 'Enter' || event.type === 'click') {
    
      fetchApi();
      navigate(`/books/`);
      setSearch('');
    }
  };



  return (
    <SearchContext.Provider
      value={{ search, books, onSearchInput, SearchBook }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
