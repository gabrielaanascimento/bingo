import { useState } from 'react'
import './App.css'
import { Bingo } from './components/Bingo'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'
import { About } from './pages/About'

function App() {
  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/bingo' element={<Bingo />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App