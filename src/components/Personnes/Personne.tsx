import React, { FC, useEffect, useState } from "react";
import DataTable from "shared/components/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import "./Personne.css";
import Modal from "shared/components/Modal/Modal";
import AddPersonne from "./AddPersonne";
import getPersonneList, {
  deletePersonne,
  updatePersonne,
} from "services/personne";
import { IPersonnes } from "utils/inteface/interface";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faUserEdit,
  faTrashAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "shared/components/ConfirmationModal/ConfirmationModal";
import UpdatePersonne from "./EditPersonne";

const Personne: FC = () => {
  const [personnes, setPersonnes] = useState<any[]>([]);
  const [filteredPersonnes, setFilteredPersonnes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add Modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // State for Update Modal
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // State for Confirmation Modal
  const [filter, setFilter] = useState({ nom: "", email: "" });
  const [personToDelete, setPersonToDelete] = useState<number | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const [personToUpdate, setPersonToUpdate] = useState<IPersonnes | null>(null);

  const openUpdateModal = (person: IPersonnes) => {
    setPersonToUpdate(person);
    setIsUpdateModalOpen(true); // Open Update Modal
  };

  const closeUpdateModal = () => setIsUpdateModalOpen(false); // Close Update Modal
  const closeAddModal = () => setIsAddModalOpen(false); // Close Add Modal
  const closeConfirmationModal = () => setIsConfirmationModalOpen(false); // Close Confirmation Modal
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
        Header: "Action",
        accessor: "action",
        Cell: ({ row }: any) => (
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
            ></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => openUpdateModal(row.original)}>
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
    closeAddModal(); // Close the Add Modal after successful addition
  };

  const handleDelete = (pers_id: number | undefined) => {
    if (!pers_id) {
      toast.error("ID de la personne manquant !");
      return;
    }
    setPersonToDelete(pers_id);
    setIsConfirmationModalOpen(true); // Open Confirmation Modal for deletion
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
        closeConfirmationModal(); // Close the Confirmation Modal after deletion
        setPersonToDelete(undefined); // Reset the ID of the person to delete
      }
    }
  };

  const handleUpdatePerson = async (updatedPerson: IPersonnes) => {
    try {
      // Convertir pers_id en string avant de l'envoyer
      const updatedData = await updatePersonne(
        Number(updatedPerson.pers_id),
        updatedPerson
      );

      // Mise à jour de l'état local avec les données retournées
      setPersonnes((prev) =>
        prev.map((p) => (p.pers_id === updatedPerson.pers_id ? updatedData : p))
      );
      setFilteredPersonnes((prev) =>
        prev.map((p) => (p.pers_id === updatedPerson.pers_id ? updatedData : p))
      );

      // toast.success("Mise à jour réussie !");
      closeUpdateModal(); // Ferme la modal après la mise à jour réussie
    } catch (error) {
      toast.error("Erreur lors de la mise à jour.");
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));

    const filteredData = personnes.filter(
      (person) =>
        person.nom.toLowerCase().includes(filter.nom.toLowerCase()) &&
        person.email.toLowerCase().includes(filter.email.toLowerCase())
    );
    setFilteredPersonnes(filteredData);
  };

  return (
    <>
      <h1 className="w-100 text-start mb-4">Personnes</h1>
      <div className="table-container mb-4">
        <div className="count-container mb-2">
          <span className="person-count">
               {filteredPersonnes.length} personnes
          </span>
        </div>
      </div>
      <div className="personne-container">
        <ToastContainer />
        <div className="data-table-top d-flex justify-content-between align-items-center">
          <Button
            // variant="success"
            onClick={() => setIsAddModalOpen(true)}
            style={{ cursor: "pointer", background: "#4265D6", fontSize:"10", color:'black' }}
          >
            <span className="d-none d-lg-inline ms-1">
              {" "}
              <FontAwesomeIcon
                icon={faPlus}
                // size="2x"
                className="text-dark"
              />
              Ajouter
            </span>
          </Button>

          <input
            type="text"
            name="nom"
            placeholder="Rechercher..."
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

        {/* Add Person Modal */}
        <Modal
          isOpen={isAddModalOpen}
          title="Ajout d'une personne"
          onClose={closeAddModal}
        >
          <AddPersonne
            onAddPerson={handleAddPerson}
            onClose={closeAddModal}
            onSuccessToast={() => {}}
          />
        </Modal>

        {/* Confirmation Modal for deletion */}
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onConfirm={confirmDelete}
          onCancel={closeConfirmationModal}
          message="Êtes-vous sûr de vouloir supprimer cette personne ?"
        />

        {/* Update Person Modal */}
        {isUpdateModalOpen && personToUpdate && (
          <Modal
            onClose={closeUpdateModal}
            isOpen={isUpdateModalOpen}
            title="Modifier une personne"
          >
            <UpdatePersonne
              isOpen={isUpdateModalOpen}
              personne={{
                ...personToUpdate,
                pers_id: String(personToUpdate.pers_id),
                image: personToUpdate.image ?? undefined,
              }}
              onUpdatePerson={handleUpdatePerson}
              onClose={closeUpdateModal}
              title="Modifier une personne"
              onSuccessToast={() => toast.success("Mise à jour réussie !")}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default Personne;
