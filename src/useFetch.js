import { useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then(data => {
        setData(data)
      })
        .catch(setError)
        .finally(() => setLoading(false));
      
  }, [url]);

  if (loading) return 'LOADING...';
  if (error) return console.log(error);

  return { data, loading, error };

}



export default useFetch;