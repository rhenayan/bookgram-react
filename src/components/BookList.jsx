import React from 'react';
import { useSearchContext } from '../contexts/searchContext';
import { useFavoriteContext } from '../contexts/favoriteContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdFavorite, MdDelete } from 'react-icons/md';

const BookList = () => {
  console.log('book list');
  const { books } = useSearchContext();

  const { addToFavorites, removeFromFavorites, favoriteToggle } =
    useFavoriteContext();

  const navigate = useNavigate();

  return (
    <div className='container'>
      <Link to='/'>
        <p className='link'>Back to search</p>
      </Link>

      <span className='page__title'>Results: </span>

      <div className='books-list'>
        {books
          .filter(book => book.volumeInfo.imageLinks !== undefined)
          .map(book => {
            // const noImageError =
            //   'https://placehold.jp/18/8d8358/e0e0e0/128x158.png?text=Cover%20Image%20Coming%20Soon';
            // const image =
            //   (book.volumeInfo.imageLinks &&
            //     book.volumeInfo.imageLinks?.thumbnail) ??
            //   noImageError;

            const image = book.volumeInfo.imageLinks.thumbnail;
            const title = book.volumeInfo.title;
            return (
              <div className='books' key={book.id + book.etag}>
                <div className='books__image'>
                  <img
                    src={image}
                    alt={title}
                    onClick={() => navigate(`/books/${book.id}`)}
                  />
                </div>
                <h2 className='books__title'>{title}</h2>

                {favoriteToggle(book.id) ? (
                  <button
                    className='button button--animate'
                    onClick={() => removeFromFavorites(book.id)}
                  >
                    <span>
                      <MdDelete fontSize='24' />
                      <span>Remove</span>
                    </span>
                  </button>
                ) : (
                  <button
                    className='button button--animate'
                    onClick={() => addToFavorites(book)}
                  >
                    <span>
                      <MdFavorite fontSize='24' />
                      <span>Add to read</span>
                    </span>
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BookList;
