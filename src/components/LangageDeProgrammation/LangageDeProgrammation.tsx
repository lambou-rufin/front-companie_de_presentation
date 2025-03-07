import React, { FC, useEffect, useState } from "react";
import getLangageDeProgrammation from "../../services/langageDeProgrammation";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import DataTable from "shared/components/DataTable/DataTable";
import Modal from "shared/components/Modal/Modal"; // Modal personnalisé
import AddLanguage from "./AddLanguage";
import { useNavigate } from "react-router-dom";
import { ILanguage } from "utils/inteface/interface"; // Import de l'interface ILanguage
import "./LangageDeProgrammation.css"; // Import de votre fichier CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTrashAlt,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

const LangageDeProgrammation: FC = () => {
  const [langageDeProgrammation, setLangageDeProgrammation] = useState<
    ILanguage[]
  >(
    [] // Utilisation de l'interface ILanguage
  );
  const [filteredLangage, setFilteredLangage] = useState<ILanguage[]>([]); // Utilisation de l'interface ILanguage
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({ nom: "" });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const columns = [
    {
      Header: "ID",
      accessor: "langage_id" as keyof ILanguage,
    },
    {
      Header: "Nom",
      accessor: "nom" as keyof ILanguage,
    },
    {
      Header: "Action",
      accessor: "action" as keyof ILanguage,
      Cell: ({ row }: { row: any }) => (
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
          ></Dropdown.Toggle>
          <DropdownMenu>
            <DropdownItem onClick={() => openUpdateModal(row.original)}>
              <FontAwesomeIcon icon={faUserEdit} className="me-2" />
              Modifier
            </DropdownItem>
            <DropdownItem
              onClick={() => handleDelete(row.original.pers_id)}
              className="text-danger"
            >
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
              Supprimer
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLangageDeProgrammation();
        setLangageDeProgrammation(data); // Assurez-vous que 'data' est de type ILanguage[]
        setFilteredLangage(data);
      } catch (err) {
        setError("Erreur lors du chargement des langages de programmation.");
        toast.error("Erreur lors du chargement des langages de programmation."); // Ajouter un toast d'erreur
      }
    };
    fetchData();
  }, []);

  const handleAddLanguage = (language: ILanguage) => {
    setLangageDeProgrammation((prev) => [...prev, language]);
    setFilteredLangage((prev) => [...prev, language]);

    toast.success("Langage de programmation ajouté avec succès !");
    closeModal();
  };

  const openUpdateModal = (language: ILanguage) => {
    // Implémentez la logique pour ouvrir la modal d'édition
    console.log("Modifier :", language);
  };

  const handleDelete = (id: string) => {
    // Implémentez la logique de suppression
    console.log("Supprimer l'élément avec ID :", id);
  };

  // const handleRowClick = (row: any) => {
  //   navigate(`/langage/${row.langage_id}`);
  // };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));

    const filteredData = langageDeProgrammation.filter(
      (langage: ILanguage) =>
        langage.nom.toLowerCase().includes(value.toLowerCase()) // Assurez-vous que 'nom' existe dans ILanguage
    );

    setFilteredLangage(filteredData);
  };

  if (error) return <div className="text-danger">{error}</div>;

  return (
    <>
      <h1 className="w-100 text-start mb-4">Langage de programmation</h1>
      <div className="langage-container">
        <ToastContainer />
        <div className="data-table-top d-flex justify-content-between align-items-center">
          <span className="add-icon" onClick={openModal} role="button">
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="2x"
              className="text-dark"
            />
          </span>
          <input
            type="text"
            name="nom"
            value={filter.nom}
            onChange={handleFilterChange}
            placeholder="Rechercher..."
            className="form-control search-input"
          />
        </div>
        <div className="table-container">
          {filteredLangage.length > 0 ? (
            <DataTable
              columns={columns}
              data={filteredLangage}
              // onRowClick={handleRowClick}
            />
          ) : (
            <p className="text-center">Aucun langage disponible.</p>
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          title="Ajouter un langage"
          onClose={closeModal}
        >
          <AddLanguage onAddLanguage={handleAddLanguage} onClose={closeModal} />
        </Modal>
      </div>
    </>
  );
};

export default LangageDeProgrammation;
