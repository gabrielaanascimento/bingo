import React, { useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const [nomeBingo, setNomeBingo] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nomeBingo.trim()) {
        alert(`Bingo "${nomeBingo}" iniciado!`)
        window.localStorage.setItem('nomeBingo', nomeBingo)
        setNomeBingo('')
        navigate('/bingo')
      }
  }

  return (
    <div className="home-page">
      
      <main className="home-content">
        <div className="hero-section">
          
          <div className="hero-logo-container">
            <img 
              src="/logo-paroquia.jpg" 
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
                  required
                />
              </div>
              <button type="submit" className="bingo-button">
                Iniciar
              </button>
            </form>
          </div>

        </div>
      </main>

      <footer className="footer">
        <p>Paróquia Nossa Senhora de Lourdes, Poá</p>
      </footer>
    </div>
  )
}