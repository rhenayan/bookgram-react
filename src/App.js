import React from 'react';
import Search from './components/Search';
import { Routes, Route } from 'react-router-dom';
// import BookList from './components/BookList';
// import BookDetails from './components/BookDetails'
import FavoriteList from './components/FavoriteList';
import Navbar from './components/Navbar';
import "the-new-css-reset/css/reset.css";

const LazySearchResults = React.lazy(()=> import('./components/BookList'));
const LazyBookDetails = React.lazy(()=> import('./components/BookDetails'))

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Search/>} />
        <Route path='/books/' element={<React.Suspense fallback ='Loading...'><LazySearchResults/></React.Suspense>} />
        <Route path='/books/:id' element={<React.Suspense fallback ='Loading...'><LazyBookDetails/></React.Suspense>} />
        <Route path='/favorites' element={<FavoriteList />} />
      </Routes>
    </>
  );
}

export default App;
