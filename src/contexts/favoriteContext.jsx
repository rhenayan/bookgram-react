import { createContext,useContext } from 'react';
import useLocalStorage from '../useLocalstorage';

const FavoriteContext = createContext();

export const useFavoriteContext = () => {
  const ctx = useContext(FavoriteContext);

  if (ctx === undefined) {
    throw new Error('The Context must be within the Provider!');
  }

  return ctx;
};

const FavoriteContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage('favorite', []);
  
  const addToFavorites = book => {
      const oldFavorite = [...favorites]
     const newFavorite =oldFavorite.concat(book)
      
      setFavorites(newFavorite);
  
  };

  const removeFromFavorites = id => {
    const filteredFavorites = [...favorites].filter(book => book.id !== id);

    setFavorites(filteredFavorites);

  };

  const favoriteToggle = id => {
    const isFavorite = favorites.some(book => book.id === id);
    return isFavorite;
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, favoriteToggle }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
