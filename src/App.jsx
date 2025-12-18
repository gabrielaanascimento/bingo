import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { BingoPage } from './pages/Bingo'
import { Comerciais } from './pages/Comerciais'
import { Header } from './components/Header'
import { Admin } from './pages/Admin'

function App() {
  return (
    <HashRouter>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Header />
        <main style={{ 
          flex: 1,              /* Faz o conteúdo ocupar todo o resto da largura */
          marginLeft: '80px',   /* Margem exata da largura da Nav */
          backgroundColor: '#f4f7f6', /* Opcional: cor de fundo para a área de conteúdo */
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/bingo' element={<BingoPage />} />
            <Route path='/comerciais' element={<Comerciais />} />
            <Route path='/admin' element={<Admin />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}

export default App