import React, { FC, useEffect, useState } from 'react';
import getLangageDeProgrammation from '../../services/langageDeProgrammation';

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
    <div>
      <h1>Langage de programmation</h1>
      {/* Render langage de programmation or a message if no data */}
      {langageDeProgrammation ? <pre>{JSON.stringify(langageDeProgrammation, null, 2)}</pre> : <p>No langage de programmation available</p>}
    </div>
  );
}

export default LangageDeProgrammation;
