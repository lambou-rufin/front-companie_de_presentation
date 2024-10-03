import React, { FC, useEffect, useState } from 'react';
import getPersonneList from '../../services/personne';
import DataTable from 'shared/components/DataTable/DataTable';
import Icon from 'shared/components/Icon/Icon';

const Personne: FC = () => {
  const [personnes, setPersonnes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPersonneList();
        setPersonnes(data); // Les données doivent être de type non null ici
      } catch (err) {
        setError('Failed to fetch personnes');
      }
    };

    fetchData();
  }, []);

  // Définissez les colonnes ici, en dehors de la logique conditionnelle
  const columns = React.useMemo(
    () => [
      {
        Header: 'Nom',
        accessor: 'nom', // clé pour le champ 'nom' dans vos données
      },
      {
        Header: 'Email',
        accessor: 'email', // clé pour le champ 'email' dans vos données
      },
      {
        Header: 'Numéro de téléphone',
        accessor: 'phoneNumber', // clé pour le champ 'phoneNumber' dans vos données
      },
      // Ajoutez d'autres colonnes selon vos besoins
    ],
    []
  );

  if (error) return <div>Error: {error}</div>;


  const handleAddPerson = () => {
    // Logique pour ajouter une personne
  };  

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h1 className="text-center">Personnes</h1>
        <span><Icon name="plus " type={'plus'}  onClick={handleAddPerson}></Icon></span>

      </div>
      {personnes.length > 0 ? (
        <DataTable columns={columns} data={personnes} />
      ) : (
        <p>No personnes available</p>
      )}
    </div>
  );
  
};

export default Personne;
