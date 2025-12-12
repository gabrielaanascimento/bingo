import { useState } from 'react'
import './App.css'
import { Bingo } from './components/Bingo'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { BingoPage } from './pages/Bingo'
import { Comerciais } from './pages/Comerciais'
import { Header } from './components/Header'


function App() {
  return (
   <div>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/bingo' element={<BingoPage />} />
        <Route path='/comerciais' element={<Comerciais />} />
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App