import { useEffect, useState } from 'react';

const useFetch = <T>(
  url: string
): { loading: boolean; data: T | null; error: Error | null } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchResult = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json as T);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [url]);

  return { loading: loading, data: data, error: error };
};

export default useFetch;
