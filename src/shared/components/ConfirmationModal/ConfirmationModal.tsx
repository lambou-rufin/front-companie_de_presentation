import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
// import { TailSpin } from "react-loader-spinner";

const ConfirmationModal: React.FC<{
  handleCloseModal: (value?: boolean) => void,
  showModal: boolean,
  message: string,
  title: string,
  loading?: boolean
}> = ({ handleCloseModal, showModal, message, title, loading = false }) => {
  return (
    <>
      <Modal show={showModal} onHide={() => handleCloseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={() => handleCloseModal(true)}>
            {/* {loading ?
              <TailSpin
                height="25"
                width="30"
                color="#fff"
                ariaLabel="loading"
              />
              : 'Confirmer'} */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
