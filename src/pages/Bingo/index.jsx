import { use, useEffect, useState } from 'react'
import './BingoPage.css'
import { Bingo } from '../../components/Bingo'

export function BingoPage() {

    const [nome, setNome] = useState('')

    useEffect(() => {
        const nomeUsuario = localStorage.getItem('nomeBingo') || ''
        setNome(nomeUsuario)
    }, [])
  return (
    <div className='app-wrapper'>      
      <main className='containerApp'>

        <h2>{nome}</h2>
        <Bingo />
      </main>

    
    </div>
  )
}

