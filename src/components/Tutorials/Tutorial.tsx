// import React, { FC, useEffect, useState } from "react";
// import { Button, Modal } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import getTutorialList from "services/tutorial";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEdit,
//   faPlus,
//   faPlusCircle,
//   faTrashAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import DataTable from "shared/components/DataTable/DataTable";
// import { AddTutorial } from "./AddTutorial";
// import "./Tutoriel.css";
// import { TutorialStatus } from "utils/inteface/enum";
// import { ITutorial } from "utils/inteface/interface";
// import { ToastContainer } from "react-toastify";

// const Tutorial: FC = () => {
//   const [tutorials, setTutorials] = useState<ITutorial[]>([]);
//   const [filteredTutorials, setFilteredTutorials] = useState<ITutorial[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [filter, setFilter] = useState({ title: "" });
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Ouvrir et fermer le modal
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);
//   // Colonnes de la table avec typage explicite
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "ID",
//         accessor: "id" as const,
//       },
//       {
//         Header: "Titre",
//         accessor: "title" as const,
//       },
//       {
//         Header: "Description",
//         accessor: "description" as const,
//       },
//       {
//         Header: "Désignation",
//         accessor: "designation" as const,
//       },
//       {
//         Header: "Statut",
//         accessor: "status" as const,
//         Cell: ({ value }: { value: TutorialStatus }) => {
//           switch (value) {
//             case TutorialStatus.EN_ATTENTE:
//               return "En attente";
//             case TutorialStatus.DEJA_FINI:
//               return "Déjà fini";
//             case TutorialStatus.EN_COURS:
//               return "En cours";
//             default:
//               return "Inconnu";
//           }
//         },
//       },
//       {
//         Header: "Date",
//         accessor: "createdAt" as const,
//         Cell: ({ value }: { value: Date }) =>
//           new Date(value).toLocaleDateString("fr-FR", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//       },
//       {
//         Header: "Action",
//         Cell: ({ row }: { row: { original: ITutorial } }) => (
//           <div className="d-flex">
//             <Button
//               variant="link"
//               size="sm"
//               onClick={() => handleEditClick(row.original)}
//               className="p-0 me-2"
//             >
//               <FontAwesomeIcon icon={faEdit} />
//             </Button>
//             <Button
//               variant="link"
//               size="sm"
//               onClick={() => handleDeleteClick(row.original)}
//               className="btn btn-outline-danger btn-md delete-all d-flex justify-content-between align-items-center"
//             >
//               <FontAwesomeIcon icon={faTrashAlt} />
//             </Button>
//           </div>
//         ),
//       },
//     ],
//     [tutorials]
//   );

//   // Récupérer la liste des tutoriels
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getTutorialList();
//         setTutorials(data);
//         setFilteredTutorials(data);
//       } catch (err) {
//         setError("Échec du chargement des tutoriels.");
//       }
//     };
//     fetchData();
//   }, []);

//   // Gérer l'édition d'un tutoriel
//   const handleEditClick = (tutorial: ITutorial) => {
//     navigate(`/tutorial/edit/${tutorial.id}`);
//   };

//   // Gérer la suppression d'un tutoriel
//   const handleDeleteClick = async (tutorial: ITutorial) => {
//     try {
//       // Supposons que la suppression soit gérée côté serveur
//       setTutorials((prev) => prev.filter((t) => t.id !== tutorial.id));
//       setFilteredTutorials((prev) => prev.filter((t) => t.id !== tutorial.id));
//     } catch (err) {
//       setError("Échec de la suppression du tutoriel.");
//     }
//   };

//   // Ajouter un nouveau tutoriel
//   const handleAddTutorial = (tutorial: ITutorial) => {
//     if (tutorial.id && tutorial.title) {
//       setTutorials((prev) => [...prev, tutorial]);
//       setFilteredTutorials((prev) => [...prev, tutorial]);
//     }
//     closeModal();
//   };

//   // Gérer le changement dans le filtre
//   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFilter((prev) => ({ ...prev, [name]: value }));

//     const filteredData = tutorials.filter((tutorial) =>
//       tutorial.title.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredTutorials(filteredData);
//   };

//   if (error) return <div className="text-danger text-center">{error}</div>;

//   return (
//     <>
//       <h1 className="w-100 text-start mb-4">Tutoriels</h1>
//       <div className="tutoriel-container">
//         <ToastContainer />
//         <div className="data-table-top d-flex justify-content-between align-items-center">
//           <Button
//             // size="lg"
//             onClick={openModal}
//             role="button"
//             style={{ cursor: "pointer", background: "#4265D6", color:'black' }}
//           >
//             <span className="d-none d-lg-inline ms-1">
//               {" "}
//               <FontAwesomeIcon
//                 icon={faPlus}
//                 // size="2x"
//                 className="text-dark"
//               />
//               Ajouter
//             </span>
//           </Button>
//           <input
//             type="text"
//             name="title"
//             placeholder="Rechercher..."
//             value={filter.title}
//             onChange={handleFilterChange}
//             className="form-control"
//             style={{ width: "200px" }}
//           />
//         </div>
//         <div className="table-container mt-3">
//           {filteredTutorials.length > 0 ? (
//             <DataTable columns={columns} data={filteredTutorials} />
//           ) : (
//             <p className="text-center">Aucun tutoriel disponible</p>
//           )}
//         </div>
//         <Modal show={isModalOpen} onHide={closeModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Ajout d'un tutoriel</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <AddTutorial
//               onAddTutorial={handleAddTutorial}
//               onClose={closeModal}
//             />
//           </Modal.Body>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default Tutorial;
import React, { FC, useEffect, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import getTutorialList from "services/tutorial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AddTutorial } from "./AddTutorial";
import "./Tutoriel.css";
import { TutorialStatus } from "utils/inteface/enum";
import { ITutorial } from "utils/inteface/interface";
import { ToastContainer } from "react-toastify";
import TutorialCard from "shared/components/TutorialCard/TutorialCard";

const Tutorial: FC = () => {
  const [tutorials, setTutorials] = useState<ITutorial[]>([]);
  const [filteredTutorials, setFilteredTutorials] = useState<ITutorial[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({ title: "" });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTutorialList();
        setTutorials(data);
        setFilteredTutorials(data);
      } catch (err) {
        setError("Échec du chargement des tutoriels.");
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (tutorial: ITutorial) => {
    navigate(`/tutorial/edit/${tutorial.id}`);
  };

  const handleDeleteClick = async (tutorial: ITutorial) => {
    try {
      setTutorials((prev) => prev.filter((t) => t.id !== tutorial.id));
      setFilteredTutorials((prev) => prev.filter((t) => t.id !== tutorial.id));
    } catch (err) {
      setError("Échec de la suppression du tutoriel.");
    }
  };

  const handleAddTutorial = (tutorial: ITutorial) => {
    if (tutorial.id && tutorial.title) {
      setTutorials((prev) => [...prev, tutorial]);
      setFilteredTutorials((prev) => [...prev, tutorial]);
    }
    closeModal();
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));

    const filteredData = tutorials.filter((tutorial) =>
      tutorial.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTutorials(filteredData);
  };

  if (error) return <div className="text-danger text-center">{error}</div>;

  return (
    <>
      <h1 className="w-100 text-start mb-4">Tutoriels</h1>
      <div className="tutoriel-container">
        <ToastContainer />
        <div className="data-table-top d-flex justify-content-between align-items-center">
          <Button
            onClick={openModal}
            role="button"
            style={{ cursor: "pointer", background: "#4265D6", color: 'black' }}
          >
            <span className="d-none d-lg-inline ms-1">
              <FontAwesomeIcon icon={faPlus} className="text-dark" />
              Ajouter
            </span>
          </Button>
          <input
            type="text"
            name="title"
            placeholder="Rechercher..."
            value={filter.title}
            onChange={handleFilterChange}
            className="form-control"
            style={{ width: "200px" }}
          />
        </div>
        <div className="mt-3">
          {filteredTutorials.length > 0 ? (
            <Row>
              {filteredTutorials.map((tutorial) => (
                <Col key={tutorial.id} md={4} className="mb-4">
                  <TutorialCard
                    tutorial={tutorial}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center">Aucun tutoriel disponible</p>
          )}
        </div>
        <Modal show={isModalOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Ajout d'un tutoriel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddTutorial
              onAddTutorial={handleAddTutorial}
              onClose={closeModal}
            />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Tutorial;