import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import SearchContextProvider from './contexts/searchContext';
import FavoriteContextProvider from './contexts/favoriteContext';
import './styles/scss/main/main.css'
import './styles/scss/navbar/navbar.css'
import './styles/scss/booklist/booklist.css'
import './styles/scss/bookdetails/bookdetails.css'
import './styles/scss/search/search.css'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    
        <FavoriteContextProvider>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </FavoriteContextProvider>
    
    </BrowserRouter>
  </React.StrictMode>
);
