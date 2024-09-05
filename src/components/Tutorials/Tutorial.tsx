import React, { FC, useEffect, useState } from 'react';
import getTutorial from '../../services/tutorial';

const Tutorial: FC = () => {
  const [tutorials, setTutorials] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTutorial();
        setTutorials(data);
      } catch (err) {
        setError('Failed to fetch tutorials');
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Tutorial</h1>
      {/* Render tutorials or a message if no data */}
      {tutorials ? <pre>{JSON.stringify(tutorials, null, 2)}</pre> : <p>No tutorials available</p>}
    </div>
  );
}

export default Tutorial;
