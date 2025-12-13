import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import './Comerciais.css';

export const Comerciais = () => {
  const [sponsors, setSponsors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('patrocinadores') || '[]');
    setSponsors(dados);

    if (dados.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % dados.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [sponsors.length]);

  if (sponsors.length === 0) {
    return (
      <div className="comerciais-page">
        <div className="empty-state">
          <h2>Nenhum patrocinador cadastrado.</h2>
        </div>
      </div>
    );
  }

  const currentSponsor = sponsors[currentIndex];

  return (
    <div className="comerciais-page">
      
      <div className="comerciais-container">
        <div className="slide-wrapper" key={currentIndex}>
          {currentSponsor.img && (
             <img 
               src={`media://${currentSponsor.img}`} 
               alt={currentSponsor.nome}
               className="sponsor-image"
             />
          )}
          
          <div className="sponsor-caption">
            {currentSponsor.nome}
          </div>
        </div>
      </div>
    </div>
  );
};