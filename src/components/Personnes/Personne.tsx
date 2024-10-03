import React, { FC, useEffect, useState } from 'react';
import getPersonneList from '../../services/personne';
import DataTable from 'shared/components/DataTable/DataTable';
import Icon from 'shared/components/Icon/Icon';
import { useNavigate } from 'react-router-dom';

const Personne: FC = () => {
  const [personnes, setPersonnes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

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

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nom',
        accessor: 'nom',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Numéro de téléphone',
        accessor: 'phoneNumber',
      },
    ],
    []
  );

  if (error) return <div>Error: {error}</div>;

  const handleAddPerson = () => {
    // Logique pour ajouter une personne
  };

  // Handle row click to navigate to a detailed view
  const handleRowClick = (row: any) => {
    navigate(`/personne/${row.id}`); // Assuming each personne has an 'id'
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h1 className="text-center">Personnes</h1>
        <span>
          <Icon name="plus" type={'plus'} onClick={handleAddPerson} />
        </span>
      </div>
      {personnes.length > 0 ? (
        <DataTable columns={columns} data={personnes} onRowClick={handleRowClick} />
      ) : (
        <p>No personnes available</p>
      )}
    </div>
  );
};

export default Personne;
