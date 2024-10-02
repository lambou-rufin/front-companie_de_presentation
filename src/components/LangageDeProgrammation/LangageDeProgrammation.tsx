import React, { FC, useEffect, useState } from 'react';
import getLangageDeProgrammation from '../../services/langageDeProgrammation';
import { Button, Accordion } from 'react-bootstrap';
import { Icon } from '../../shared/components';

const LangageDeProgrammation: FC = () => {
  const [langageDeProgrammation, setLangageDeProgrammation] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLangageDeProgrammation();
        setLangageDeProgrammation(data);
      } catch (err) {
        setError('Failed to fetch  langage de programmation');
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <div>
      <h1 className="text-center mt-3">Langage de programmation</h1>
    <div className="data-table-top mt-3">
        <div>
          <Button variant="success" size="sm" >
            <Icon name="plus" type={'home'}></Icon>
            <span>Ajouter langage</span>
          </Button>
          <Button variant="success" className="ms-2" size="sm" >
            <Icon name="plus" type={'code'}></Icon>
            <span>Ajouter équipe</span>
          </Button>
          <Button variant="success" className="ms-2" size="sm" >
            <Icon name="plus" type={'code'}></Icon>
            <span>Ajouter poste</span>
          </Button>
          <Button variant="success" className="ms-2" size="sm">
            <Icon name="plus" type={'code'}></Icon>
            <span>Ajouter volontaire</span>
          </Button>
        </div>
      </div>
    <Accordion>
      {/* Render langage de programmation or a message if no data */}
      {langageDeProgrammation ? <pre>{JSON.stringify(langageDeProgrammation, null, 2)}</pre> : <p>No langage de programmation available</p>}
    </Accordion>
    </div>
    </>
  );
}

export default LangageDeProgrammation;
