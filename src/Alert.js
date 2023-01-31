import React, { useEffect } from 'react';

const Alert = ({ type, message, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list, removeAlert]);
  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;