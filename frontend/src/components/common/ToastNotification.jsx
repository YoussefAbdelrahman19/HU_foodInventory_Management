import React from 'react';
import { Toast } from 'react-bootstrap';

const ToastNotification = ({ show, message, type }) => {
  const toastStyles = {
    // Define your styles for different types of messages here
    success: { backgroundColor: 'green' },
    error: { backgroundColor: 'red' }
  };

  return (
    <Toast show={show} style={toastStyles[type]} delay={3000} autohide>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};
export default ToastNotification;
