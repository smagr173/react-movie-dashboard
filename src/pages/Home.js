import { useState, useEffect } from 'react';

import '../assets/styles/Home.css';
import Header from '../components/Header';
import MovieList from '../components/MovieList';

function Home() {
  const [movieCollection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(null);

  useEffect(() => {
    const target = `https://code-challenge.spectrumtoolbox.com/api/movies`;
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: 'Api-Key q3MNxtfep8Gt' }
    };
    const getCollection = async () => {
      try {
        const response = await fetch(target, requestOptions);
        if (!response.ok) {
          throw new Error(
            `HTTP error: The status is ${response.status}`
          );
        }
        let collection = await response.json();
        setCollection(collection.data);
        setError(null);
      } catch(err) {
        setError(err.message);
        setCollection(null);
      } finally {
        setLoading(false);
      }  
    }
    getCollection()
  }, [])

  return (
    <div>
      <Header />
      <div className='Home-content'>
        {loading && <div>A moment please...</div>}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        {movieCollection && <MovieList showMore={showMore} data={movieCollection} />}
        {!showMore && movieCollection &&
          <div className='show-more-container'>
            <button className='show-more-btn' onClick={() => setShowMore(true)}>
              Show More
            </button>
          </div>
        }
      </div>
    </div>
  );
}

export default Home;
