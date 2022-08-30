import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useFetch from '../useFetch';
import { useFavoriteContext } from '../contexts/favoriteContext';
import { MdFavorite, MdDelete, MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";


const BookDetails = () => {
  console.log('book details');
  const [isReadMoreShown, setReadMoreShown] = useState(false);
  const { addToFavorites, removeFromFavorites, favoriteToggle } =
    useFavoriteContext();
  const { id } = useParams();


  const { data: detail } = useFetch(
    'https://www.googleapis.com/books/v1/volumes/'+id+'?key=AIzaSyBj7bEb0u65JxGlbWamxAL8mgWXlXitonw'
  );



  const toggleBtn = () => {
    setReadMoreShown(prevState => !prevState);
  };


  // const notFound = '-';
  const noCoverPage = 'Cover Page Not Available'
  const image =
    detail?.volumeInfo.imageLinks.extraLarge ||
    detail?.volumeInfo.imageLinks.large ||
    detail?.volumeInfo.imageLinks.medium ||
    detail?.volumeInfo.imageLinks.small ||
    detail?.volumeInfo.imageLinks.smallThumbnail ;
  const title = detail?.volumeInfo.title;
  const description = detail?.volumeInfo.description ?? '';
  const author = detail?.volumeInfo.authors ;
  const publisher = detail?.volumeInfo.publisher ;
  const publishDate =detail?.volumeInfo.publishedDate ;
  const isbn =
  detail?.volumeInfo.industryIdentifiers?.map(id => id.identifier);
  const pages = detail?.volumeInfo.pageCount;
  const htmlString = description;

  return (
    <div className='container'>
      <Link to='/books/'>
        <p className='link'>Back to results</p>
      </Link>

      <div className='detail'>
        <div className='detail__left'>
          <div className='detail__img'>
            <img src={image ? image : noCoverPage} alt=''/>
          </div>

          <div className='detail__ids'>
            <div className='detail__labels'>
              <p>Publisher:</p>
              <p>Publish Date:</p>
              <p>ISBN:</p>
              <p>Pages:</p>
            </div>

            <div className='detail__texts'>
              <p>{publisher}</p>
              <p>{publishDate}</p>
              <p>{isbn}</p>
              <p>{pages}</p>
            </div>
          </div>
        </div>

        <div className='detail__right'>
          <h2 className='detail__title'>{title}</h2>
          <h1 className='detail__author'>by {author}</h1>

          <p
            className='detail__description'
            dangerouslySetInnerHTML={
              isReadMoreShown
                ? { __html: htmlString }
                : { __html: htmlString.substr(0, 700) }
            }
          ></p> 

          <button className='detail__button-more' onClick={toggleBtn}>
            {isReadMoreShown ? <div><MdArrowBackIos fontSize='16'/> <span>Less</span></div>: <div><span>More</span><MdArrowForwardIos fontSize='16'/></div>}
          </button>

          {favoriteToggle(detail?.id) ? (
            <button
              className='button button--animate'
              onClick={() => removeFromFavorites(detail.id)}
            >
              <span>
              <MdDelete fontSize='24'/><span>Remove</span>
              </span>
            </button>
          ) : (
            <button
              className='button button--animate'
              onClick={() => addToFavorites(detail)}
            >
              <span>
              <MdFavorite fontSize='24'/><span>Add to read</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
