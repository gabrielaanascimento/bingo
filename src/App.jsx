import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { BingoPage } from './pages/Bingo'
import { Comerciais } from './pages/Comerciais'
import { Header } from './components/Header'
import { Admin } from './pages/Admin'


function App() {
  return (
   <div>
    <HashRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/bingo' element={<BingoPage />} />
        <Route path='/comerciais' element={<Comerciais />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </HashRouter>
   </div>
  )
}

export default App