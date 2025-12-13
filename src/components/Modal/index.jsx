import React from 'react';
import './Modal.css';

export const Modal = ({ open, title, message, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modal-actions">
          {onConfirm && (
            <button className="btn-confirm" onClick={onConfirm}>
              Confirmar
            </button>
          )}
          <button className="btn-close" onClick={onClose}>
            {onConfirm ? 'Cancelar' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
};
