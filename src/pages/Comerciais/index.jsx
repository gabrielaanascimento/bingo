import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import './Comerciais.css'; // Crie este arquivo para estilos se precisar

export const Comerciais = () => {
  const [sponsors, setSponsors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('patrocinadores') || '[]');
    setSponsors(dados);

    // Configura o timer do carrossel (troca a cada 5 segundos)
    if (dados.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % dados.length);
      }, 5000); 
      return () => clearInterval(interval);
    }
  }, [sponsors.length]); // Re-executa se a quantidade mudar

  if (sponsors.length === 0) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>
          Nenhum patrocinador cadastrado.
        </div>
      </div>
    );
  }

  const currentSponsor = sponsors[currentIndex];

  return (
    <div className="comerciais-page" style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#e0f7fa', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', alignItems: 'center', display: 'flex', justifyContent: 'center', borderRadius: '30px' }}>
        {/* Exibe a imagem usando o protocolo media:// */}
        {currentSponsor.img && (
           <img 
             src={`media://${currentSponsor.img}`} 
             alt={currentSponsor.nome}
             style={{ 
               width: '80%', 
               height: '80%', 
               objectFit: 'contain', // Ajusta sem cortar
               animation: 'fadeIn 1s ease-in-out', 
               borderRadius: '30px',
             }} 
           />
        )}
        
        {/* Legenda opcional */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '0',
          width: '100%',
          textAlign: 'center',
          color: '#2c3e50',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          fontSize: '2rem',
          background: 'rgba(245, 245, 245, 0.5)',
          padding: '1rem'
        }}>
          {currentSponsor.nome}
        </div>
      </div>
    </div>
  );
};