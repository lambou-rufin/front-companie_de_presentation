import React, { FC, useEffect, useState } from "react";
import getLangageDeProgrammation from "../../services/langageDeProgrammation";
import { Button } from "react-bootstrap";
import DataTable from "shared/components/DataTable/DataTable";
import Modal from "shared/components/Modal/Modal"; // Modal personnalisé
import AddLanguage from "./AddLanguage";
import { useNavigate } from "react-router-dom";
import { ILanguage } from "utils/inteface/interface";

const LangageDeProgrammation: FC = () => {
  const [langageDeProgrammation, setLangageDeProgrammation] = useState<any[]>([]);
  const [filteredLangage, setFilteredLangage] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({ nom: "" });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ouvrir et fermer le modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLangageDeProgrammation();
        setLangageDeProgrammation(data);
        setFilteredLangage(data);
      } catch (err) {
        setError("Erreur lors du chargement des langages de programmation.");
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      Header: "ID",
      accessor: "langage_id",
    },
    {
      Header: "Nom",
      accessor: "nom",
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
  ];

  // Ajouter un langage
  const handleAddLanguage = (language: ILanguage) => {
    setLangageDeProgrammation((prev) => [...prev, language]);
    setFilteredLangage((prev) => [...prev, language]);
    closeModal();
  };

  // Gérer la navigation au clic sur une ligne
  const handleRowClick = (row: any) => {
    navigate(`/langage/${row.langage_id}`);
  };

  // Gérer le filtre
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));

    const filteredData = langageDeProgrammation.filter((langage: { nom: string }) =>
      langage.nom.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredLangage(filteredData);
  };

  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div>
      <h1 className="text-center mt-3">Langage de programmation</h1>
      <div className="data-table-top d-flex justify-content-between align-items-center mb-3 mt-3">
      <button className="btn btn-success" onClick={openModal}>
          Ajouter
        </button>
        <input
          type="text"
          name="nom"
          value={filter.nom}
          onChange={handleFilterChange}
          placeholder="Rechercher..."
          className="form-control me-3"
          style={{ width: "200px" }} // Remplace 200px par la largeur désirée
        />
       
      </div>
      <div className="table-container">
        {filteredLangage.length > 0 ? (
          <DataTable
            columns={columns}
            data={filteredLangage}
            onRowClick={handleRowClick}
          />
        ) : (
          <p className="text-center">Aucun langage disponible.</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} title="Ajouter un langage" onClose={closeModal}>
        <AddLanguage onAddLanguage={handleAddLanguage} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default LangageDeProgrammation;
