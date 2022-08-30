import React from 'react';
import { useFavoriteContext } from '../contexts/favoriteContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FavoriteList = () => {
  console.log('my favorites');
  const { favorites, removeFromFavorites } = useFavoriteContext();
  const navigate = useNavigate();
  const length = favorites.length

  return (
    <div className='container'>
      {length > 0 ? (
        <Link to='/books/'>
          <p className='link'>Back to Book List</p>
        </Link>
      ) : (
        <Link to='/'>
          <p className='link'>Find a book</p>
        </Link>
      )}

      {length > 0 && (
        <p className='page__title page__title--center'>
          You've added {length} {length > 1 ? 'books' : 'book'}
        </p>
      )}

      <div className='books-list'>
        {length> 0 ? (
          favorites.map(book => {
            const image = book.volumeInfo.imageLinks.smallThumbnail;
              // book.volumeInfo.imageLinks &&

            const title = book.volumeInfo.title;
            const noImageError =
              'https://placehold.jp/18/8d8358/e0e0e0/128x158.png?text=Cover%20Image%20Coming%20Soon';

            return (
              <div className='books' key={book.id}>
                <img
                  src={image ? image : noImageError}
                  alt=''
                  onClick={() => navigate(`/books/${book.id}`)}
                />
                <h2 className='books__title'>{title}</h2>

                <button
                  className='button button--animate'
                  onClick={() => removeFromFavorites(book.id)}
                >
                  <span>
                    <span>Remove</span>
                  </span>
                </button>
                {/* {favoriteToggle(book.id) ? (
                <button onClick={() => removeFromFavorites(book.id)}>
                  Remove from Favorites
                </button>
              ) : (
                <button onClick={() => addToFavorites(book)}>
                  Add to Favorites
                </button>
              )} */}
              </div>
            );
          })
        ) : (
          <p className='books__message'> You haven't added any books yet!</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteList;
