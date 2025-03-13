import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ITutorial } from "utils/inteface/interface";
import { TutorialStatus } from "utils/inteface/enum";

interface TutorialCardProps {
  tutorial: ITutorial;
  onEdit: (tutorial: ITutorial) => void;
  onDelete: (tutorial: ITutorial) => void;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, onEdit, onDelete }) => {
  const getStatusLabel = (status: TutorialStatus) => {
    switch (status) {
      case TutorialStatus.EN_ATTENTE:
        return "En attente";
      case TutorialStatus.DEJA_FINI:
        return "Déjà fini";
      case TutorialStatus.EN_COURS:
        return "En cours";
      default:
        return "Inconnu";
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{tutorial.title}</h5>
        <p className="card-text">{tutorial.description}</p>
        <p className="card-text">
          <small className="text-muted">Désignation: {tutorial.designation}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">Statut: {getStatusLabel(tutorial.status)}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">
            Date:{" "}
            {new Date(tutorial.createdAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </small>
        </p>
        <div className="d-flex justify-content-end">
          <Button
            variant="link"
            size="sm"
            onClick={() => onEdit(tutorial)}
            className="p-0 me-2"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            variant="link"
            size="sm"
            onClick={() => onDelete(tutorial)}
            className="btn btn-outline-danger btn-md delete-all d-flex justify-content-between align-items-center"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;