import React from 'react';
import { Modal, Button } from 'react-bootstrap';  // Importer les composants Modal et Button de React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';  // Assure-toi que le CSS de Bootstrap est importé

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel, message }) => {
  return (
    <Modal show={isOpen} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onCancel}>Cancel</Button>
        <Button variant="success" onClick={onConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
