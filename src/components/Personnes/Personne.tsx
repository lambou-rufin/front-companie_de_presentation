import React, { FC, useEffect, useState } from "react";
import DataTable from "shared/components/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import "./Personne.css";
import Modal from "shared/components/Modal/Modal";
import AddPersonne from "./AddPersonne"; // Assurez-vous que le chemin est correct
import getPersonneList from "services/personne";
import { IPersonnes } from "utils/inteface/interface";
import { Dropdown, ButtonGroup } from "react-bootstrap"; // Importation de React-Bootstrap

const Personne: FC = () => {
  const [personnes, setPersonnes] = useState<any[]>([]);
  const [filteredPersonnes, setFilteredPersonnes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({ nom: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPersonneList();
        setPersonnes(data);
        setFilteredPersonnes(data); // Initialise le tableau filtré
      } catch (err) {
        setError("Failed to fetch personnes");
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Nom",
        accessor: "nom",
      },
      {
        Header: "Prénom",
        accessor: "prenom", // Ajout du prénom
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Adresse",
        accessor: "adress", // Ajout de l'adresse
      },
      {
        Header: "Numéro de téléphone",
        accessor: "phoneNumber",
      },
      {
        Header: "Image",
        accessor: "image", // Ajout de l'image
        Cell: ({ value }: { value: string }) => (
          <img
            src={value}
            alt="Personne"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        ), // Affichage de l'image dans une cellule
      },
      {
        Header: "Action",
        accessor: "action",
        // Cell: ({ row }: any) => (
        //   <Dropdown as={ButtonGroup}>
        //     <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        //       Actions
        //     </Dropdown.Toggle>
        //     <Dropdown.Menu>
        //       <Dropdown.Item onClick={() => handleUpdate(row.original)}>Mettre à jour</Dropdown.Item>
        //       <Dropdown.Item onClick={() => handleDelete(row.original.id)} className="text-danger">
        //         Supprimer
        //       </Dropdown.Item>
        //     </Dropdown.Menu>
        //   </Dropdown>
        // ),
      },
    ],
    []
  );

  if (error) return <div>Error: {error}</div>;

  // Gérer l'ajout d'une personne
  const handleAddPerson = (person: IPersonnes) => {
    setPersonnes((prev) => [...prev, person]);
    setFilteredPersonnes((prev) => [...prev, person]); // Mettre à jour le tableau filtré
    console.log(person); // Affiche les détails de la personne ajoutée
  };

  // Ouvrir et fermer le modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle row click to navigate to a detailed view
  const handleRowClick = (row: any) => {
    navigate(`/personne/${row.id}`);
  };

  // Gérer la suppression d'une personne
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette personne ?"
    );
    if (confirmDelete) {
      setPersonnes(personnes.filter((person) => person.id !== id));
      setFilteredPersonnes(
        filteredPersonnes.filter((person) => person.id !== id)
      ); // Mettre à jour le tableau filtré
      console.log(`Personne avec l'ID ${id} supprimée`);
    }
  };

  // Gérer la mise à jour d'une personne
  const handleUpdate = (person: IPersonnes) => {
    // Vous pouvez implémenter la logique de mise à jour ici
    console.log("Mettre à jour la personne", person);
  };

  // Gérer les changements dans le formulaire de filtre
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));

    // Filtrer les personnes en fonction des critères
    const filteredData = personnes.filter(
      (person) =>
        (person.nom.toLowerCase().includes(value.toLowerCase()) &&
          name === "nom") ||
        (person.email.toLowerCase().includes(value.toLowerCase()) &&
          name === "email")
    );

    setFilteredPersonnes(filteredData);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h1 className="text-center">Personnes</h1>
      </div>

      {/* Formulaire de filtre */}
      <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
      <button className="btn btn-success" onClick={openModal}>
          Ajouter {/* Texte du bouton */}
        </button>
        <input
          type="text"
          name="nom"
          placeholder="Rechercher"
          value={filter.nom}
          onChange={handleFilterChange}
          className="form-control me-2"
          style={{ width: "200px" }} // Remplace 200px par la largeur désirée
        />
      </div>

      <div className="table-container">
        {filteredPersonnes.length > 0 ? (
          <DataTable
            columns={columns}
            data={filteredPersonnes}
            onRowClick={handleRowClick}
          />
        ) : (
          <p>No personnes available</p>
        )}
      </div>

      {/* Modal pour ajouter une personne */}
      <Modal isOpen={isModalOpen} title="Ajout" onClose={closeModal}>
        <AddPersonne onAddPerson={handleAddPerson} onClose={closeModal} />{" "}
        {/* Passez onClose ici */}
      </Modal>
    </div>
  );
};

export default Personne;
