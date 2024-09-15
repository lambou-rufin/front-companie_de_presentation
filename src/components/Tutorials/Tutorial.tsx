import React, { FC, useEffect, useState } from 'react';
import getTutorial from '../../services/tutorial';
import { Button } from 'react-bootstrap';
import Icon from '../../shared/components/Icon/Icon';
import './Tutoriel.css';

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
    <div className="text-center mt-3">
      <h1>Tutorial</h1>
      <div className="data-table-top mt-3">
        <div>
          <Button variant="success" size="sm" >
            <Icon name="plus"></Icon>
            <span>Ajouter personne</span>
          </Button>
          <Button variant="success" className="ms-2" size="sm" >
            <Icon name="plus"></Icon>
            <span>Ajouter langage</span>
          </Button>
          <Button variant="success" className="ms-2" size="sm" >
            <Icon name="plus"></Icon>
            <span>Ajouter poste</span>
          </Button>
          <Button variant="success" className="ms-2" size="sm">
            <Icon name="plus"></Icon>
            <span>Ajouter volontaire</span>
          </Button>
        </div>
      </div>
      {/* Render tutorials or a message if no data */}
      {tutorials ? <pre>{JSON.stringify(tutorials, null, 2)}</pre> : <p>No tutorials available</p>}
    </div>
  );
}

export default Tutorial;
