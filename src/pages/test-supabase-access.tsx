import { NextLayoutPage } from 'next/types';
import { trpc } from '@utils/trpc';
import { useState, useEffect } from 'react';

const TestSupabaseAccess: NextLayoutPage = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      fetch('/api/test-db')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(result => {
          setData(result);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching data:', err);
          setError(`Failed to fetch data: ${err.message}`);
          setIsLoading(false);
        });
    }, []);
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <div>
        <h1>Supabase Access Test</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };
  
  export default TestSupabaseAccess;