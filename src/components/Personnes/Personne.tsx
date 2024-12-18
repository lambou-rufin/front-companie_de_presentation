import React, { FC, useEffect, useState } from "react";
import DataTable from "shared/components/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import "./Personne.css";
import Modal from "shared/components/Modal/Modal";
import AddPersonne from "./AddPersonne";
import getPersonneList, { deletePersonne } from "services/personne";
import { IPersonnes } from "utils/inteface/interface";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faUserEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "shared/components/ConfirmationModal/ConfirmationModal";

const Personne: FC = () => {
  const [personnes, setPersonnes] = useState<any[]>([]);
  const [filteredPersonnes, setFilteredPersonnes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({ nom: "", email: "" });
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // Nouvelle state pour le modal de confirmation
  const [personToDelete, setPersonToDelete] = useState<number | undefined>(undefined); // ID de la personne à supprimer
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPersonneList();
        setPersonnes(data);
        setFilteredPersonnes(data);
      } catch (err) {
        toast.error("Échec du chargement des données.");
        setError("Échec du chargement des données.");
      }
    };

    fetchData();
  }, []);

  const handleAddPerson = (person: IPersonnes) => {
    setPersonnes((prev) => [...prev, person]);
    setFilteredPersonnes((prev) => [...prev, person]);
    toast.success("Personne ajoutée avec succès !");
  };

  const handleDelete = (pers_id: number | undefined) => {
    if (!pers_id) {
      toast.error("ID de la personne manquant !");
      return;
    }
    
    // Ouvrir le modal de confirmation avec l'ID de la personne à supprimer
    setPersonToDelete(pers_id);
    setIsConfirmationModalOpen(true);
  };

  const confirmDelete = async () => {
    if (personToDelete !== undefined) {
      try {
        await deletePersonne(personToDelete.toString());
        setPersonnes((prev) =>
          prev.filter((person) => person.pers_id !== personToDelete)
        );
        setFilteredPersonnes((prev) =>
          prev.filter((person) => person.pers_id !== personToDelete)
        );
        toast.success("Personne supprimée avec succès !");
      } catch (error) {
        toast.error("Une erreur est survenue lors de la suppression.");
      } finally {
        setIsConfirmationModalOpen(false); // Fermer le modal de confirmation après l'action
        setPersonToDelete(undefined); // Réinitialiser l'ID de la personne à supprimer
      }
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));

    const filteredData = personnes.filter(
      (person) =>
        (person.nom.toLowerCase().includes(value.toLowerCase()) &&
          name === "nom") ||
        (person.email.toLowerCase().includes(value.toLowerCase()) &&
          name === "email")
    );

    setFilteredPersonnes(filteredData);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "pers_id",
      },
      {
        Header: "Nom",
        accessor: "nom",
      },
      {
        Header: "Prénom",
        accessor: "prenom",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Adresse",
        accessor: "adress",
      },
      {
        Header: "Téléphone",
        accessor: "phoneNumber",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ value }: { value: string }) => (
          <img src={value} alt="Personne" className="table-avatar" />
        ),
      },
      {
        Header: "Actions",
        accessor: "action",
        Cell: ({ row }: any) => (
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {/* Options */}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleUpdate(row.original)}>
                <FontAwesomeIcon icon={faUserEdit} className="me-2" />
                Modifier
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleDelete(row.original.pers_id)}
                className="text-danger"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
                Supprimer
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
      },
    ],
    []
  );

  const handleUpdate = (person: IPersonnes) => {
    console.log("Modifier la personne", person);
  };

  return (
    <div className="personne-container">
      <ToastContainer />
      <div className="header-section">
        <h1 className="page-title">Gestion des Personnes</h1>
        <span className="add-icon" onClick={openModal} role="button">
          <FontAwesomeIcon icon={faPlusCircle} size="2x" />
        </span>
      </div>
      <div className="text-start filter-section">
        <input
          type="text"
          name="nom"
          placeholder="Rechercher un nom"
          value={filter.nom}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>
      <div className="table-container">
        {filteredPersonnes.length > 0 ? (
          <DataTable columns={columns} data={filteredPersonnes} />
        ) : (
          <p>Aucune personne trouvée.</p>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        title="Ajouter une personne"
        onClose={closeModal}
      >
        <AddPersonne
          onAddPerson={handleAddPerson}
          onClose={closeModal}
          onSuccessToast={() => {}}
        />
      </Modal>

      {/* Modal de confirmation de suppression */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmationModalOpen(false)}
        message="Êtes-vous sûr de vouloir supprimer cette personne ?"
      />
    </div>
  );
};

export default Personne;
