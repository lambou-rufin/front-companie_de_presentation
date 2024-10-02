import React, { FC, useEffect, useState } from 'react';
import getPersonneList from '../../services/personne';
import DataTable from 'shared/components/DataTable/DataTable';

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

  return (
    <div>
      <h1 className="text-center mt-3">Personnes</h1>
      {personnes.length > 0 ? (
        <DataTable columns={columns} data={personnes} />
      ) : (
        <p>No personnes available</p>
      )}
    </div>
  );
};

export default Personne;
