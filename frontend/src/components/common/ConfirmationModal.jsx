import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ConfirmationModal = ({ show, onHide, onConfirm, centered }) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={onHide} centered={centered}>
      <Modal.Header closeButton>
        <Modal.Title>{t('confirmationModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('confirmationModal.message')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('confirmationModal.cancel')}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {t('confirmationModal.confirm')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
