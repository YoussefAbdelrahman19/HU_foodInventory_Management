import React from 'react';
import { Toast } from 'react-bootstrap';

const ToastNotification = ({ show, message }) => {
  return (
    <Toast show={show} delay={3000} autohide>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastNotification;
