import React, { FC, useEffect, useState } from 'react';
import getLangageDeProgrammation from '../../services/langageDeProgrammation';
import { Button } from 'react-bootstrap';
import { Icon } from '../../shared/components';
import DataTable from 'shared/components/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';

const LangageDeProgrammation: FC = () => {
  const [langageDeProgrammation, setLangageDeProgrammation] = useState<any[]>([]);
  const [filteredLangage, setFilteredLangage] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({ nom: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLangageDeProgrammation();
        setLangageDeProgrammation(data);
        setFilteredLangage(data); // Initialise le filtre avec toutes les données
      } catch (err) {
        setError('Failed to fetch langage de programmation');
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "langage_id", // Utilisez langage_id comme clé pour cette colonne
      },
      {
        Header: "Nom",
        accessor: "nom", // Utilisez nom comme clé pour le nom
      },
      {
        Header: "Action",
        accessor: "action",
        // Cell: ({ row }: any) => (
        //   <Button
        //     variant="primary"
        //     size="sm"
        //     onClick={() => handleRowClick(row.original)}
        //   >
        //     Voir plus
        //   </Button>
        // ),
      },
    ],
    []
  );

  // Handle row click to navigate to a detailed view
  const handleRowClick = (row: any) => {
    navigate(`/personne/${row.langage_id}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));

    const filteredData = langageDeProgrammation.filter(
      (langage: { nom: string }) =>
        langage.nom.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredLangage(filteredData);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-center mt-3">Langage de programmation</h1>
      <div className="data-table-top mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
        <button className="btn btn-success">
          Ajouter {/* Texte du bouton */}
        </button>
        </div>
      </div>
      <div className="table-container">
        {filteredLangage.length > 0 ? (
          <DataTable
            columns={columns}
            data={filteredLangage}
            onRowClick={handleRowClick}
          />
        ) : (
          <p>Aucun langage disponible</p>
        )}
      </div>
    </div>
  );
};

export default LangageDeProgrammation;
