import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../components/Modal';
import logo from '../../assets/logo-paroquia.jpg';

export const Home = () => {
  const [nomeBingo, setNomeBingo] = useState('');
  const [modal, setModal] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const navigate = useNavigate();

  const openModal = (title, message, onConfirm = null) => {
    setModal({ open: true, title, message, onConfirm });
  };

  const closeModal = () => {
    setModal({ open: false, title: '', message: '', onConfirm: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nomeBingo.trim()) {
      openModal('Atenção', 'Informe o nome do evento de bingo');
      return;
    }

    window.localStorage.setItem('nomeBingo', nomeBingo);

    openModal(
      'Bingo iniciado 🎉',
      `O bingo "${nomeBingo}" foi iniciado com sucesso!`,
      () => {
        closeModal();
        setNomeBingo('');
        navigate('/bingo');
      }
    );
  };

  return (
    <div className="home-page">
      <main className="home-content">
        <div className="hero-section">
          <div className="hero-logo-container">
            <img
              src={logo}
              alt="Brasão da Paróquia Nossa Senhora de Lourdes"
              className="hero-logo-large"
            />
          </div>

          <div className="hero-form-container">
            <div>
              <h2>Bem-vindo!</h2>
              <p>Prepare-se para momentos de comunhão e alegria.</p>
            </div>

            <form onSubmit={handleSubmit} className="bingo-form">
              <div className="input-group">
                <label htmlFor="bingoName">Nome do Evento de Bingo</label>
                <input
                  id="bingoName"
                  type="text"
                  className="bingo-input"
                  placeholder="Ex: Bingo da Padroeira"
                  value={nomeBingo}
                  onChange={(e) => setNomeBingo(e.target.value)}
                />
              </div>

              <button type="submit" className="bingo-button">
                Iniciar
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* MODAL */}
      <Modal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
        onConfirm={modal.onConfirm}
      />
    </div>
  );
};
