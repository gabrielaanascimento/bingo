import React, { useEffect, useState } from 'react';
import './Bingo.css';
import { Modal } from '../Modal';

export const Bingo = () => {
  /* =====================
     STATE
  ===================== */
  const [marcados, setMarcados] = useState(() => {
    const salvos = localStorage.getItem('bingoMarcados');
    return salvos ? JSON.parse(salvos) : [];
  });

  const [modal, setModal] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null
  });

  /* =====================
     STORAGE SYNC
  ===================== */
  useEffect(() => {
    localStorage.setItem('bingoMarcados', JSON.stringify(marcados));
  }, [marcados]);

  /* =====================
     MODAL HELPERS
  ===================== */
  const openModal = (title, message, onConfirm = null) => {
    setModal({ open: true, title, message, onConfirm });
  };

  const closeModal = () => {
    setModal({ open: false, title: '', message: '', onConfirm: null });
  };

  /* =====================
     BINGO LOGIC
  ===================== */
  const marcarCasa = (numero) => {
    setMarcados(prev =>
      prev.includes(numero)
        ? prev.filter(n => n !== numero)
        : [...prev, numero]
    );
  };

  const limparBingo = () => {
    openModal(
      'Limpar cartela',
      'Tem certeza que deseja limpar toda a cartela?',
      () => {
        setMarcados([]);
        closeModal();
      }
    );
  };

  /* =====================
     RENDER CASAS
  ===================== */
  const casas = Array.from({ length: 75 }, (_, i) => {
    const numero = i + 1;
    const estaMarcado = marcados.includes(numero);

    return (
      <div
        key={numero}
        className={`casa ${estaMarcado ? 'ativa' : ''}`}
        onClick={() => marcarCasa(numero)}
      >
        {numero}
      </div>
    );
  });

  /* =====================
     RENDER
  ===================== */
  return (
    <>
      <div className="tabela">
        {casas}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={limparBingo}
          className="bingo-button"
          style={{ background: '#ff4444' }}
        >
          Limpar Cartela
        </button>
      </div>

      <Modal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
        onConfirm={modal.onConfirm}
      />
    </>
  );
};
