import React, { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Icon } from "../../shared/components";
import DataTable from "shared/components/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import getTutorialList from "services/tutorial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { AddTutorial } from "./AddTutorial";
import { ITutorial } from "utils/inteface/interface";

const Tutorial: FC = () => {
  const [tutorials, setTutorials] = useState<any[]>([]);
  const [filteredTutorials, setFilteredTutorials] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({ title: "" });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ouvrir et fermer le modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTutorialList();
        setTutorials(data);
        setFilteredTutorials(data); // Initialise le filtre avec toutes les données
      } catch (err) {
        setError("Failed to fetch tutorials");
      }
    };

    fetchData();
  }, []);

  // Handle Edit click
  const handleEditClick = (tutorial: any) => {
    // Replace this with the actual edit logic (e.g., navigate to edit page)
    navigate(`/tutorial/edit/${tutorial.id}`);
  };

  // Handle Delete click
  const handleDeleteClick = async (tutorial: any) => {
    try {
      // Replace this with your API call to delete the tutorial
      // e.g., await deleteTutorial(tutorial.id);
      setTutorials(tutorials.filter((t) => t.id !== tutorial.id)); // Remove from the UI
    } catch (err) {
      setError("Failed to delete tutorial");
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Designation",
        accessor: "designation",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }: { value: string }) =>
          new Date(value).toLocaleDateString(),
      },
      {
        Header: "Actions",
        accessor: "action",
        Cell: ({ row }: any) => (
          <div className="d-flex">
            <Button
              variant="link"
              size="sm"
              onClick={() => handleEditClick(row.original)}
              className="p-0 me-2" // Remove padding and add margin to the right
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={() => handleDeleteClick(row.original)}
              className="p-0" // Remove padding
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // Ajouter un langage
  const handleAddTutorial = (tutorial: ITutorial) => {
    setTutorials((prev) => [...prev, tutorial]);
    setFilteredTutorials((prev) => [...prev, tutorial]);
    closeModal();
  };

  // Handle row click to navigate to a detailed view
  const handleRowClick = (row: any) => {
    navigate(`/tutorial/${row.id}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));

    const filteredData = tutorials.filter((tutorial: { title: string }) =>
      tutorial.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredTutorials(filteredData);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-center mt-3">Tutorials</h1>
      <div className="data-table-top mt-3">
        <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
          <span
            onClick={() => setIsModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faAdd} />
          </span>
          <input
            type="text"
            name="title"
            placeholder="Rechercher"
            value={filter.title}
            onChange={handleFilterChange}
            className="form-control me-2"
            style={{ width: "200px" }} // Remplace 200px par la largeur désirée
          />
        </div>
      </div>
      <div className="table-container mt-3">
        {filteredTutorials.length > 0 ? (
          <DataTable
            columns={columns}
            data={filteredTutorials}
            onRowClick={handleRowClick}
          />
        ) : (
          <p>Aucun tutoriel disponible</p>
        )}
      </div>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un tutoriel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTutorial
            onAddTutorial={handleAddTutorial}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Tutorial;
