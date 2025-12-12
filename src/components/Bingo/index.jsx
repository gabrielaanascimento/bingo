import React, {useState} from 'react'
import './Bingo.css'

export const Bingo = () => {
  const [marcados, setMarcados] = useState([])
   const casas = []
 
   const marcarCasa = (numero) => {
     if(marcados.includes(numero)) {
       const novosMarcados = marcados.filter(n => n !== numero)
       setMarcados(novosMarcados)
     } else {
       setMarcados([...marcados, numero])
     }
   }
 
   for(let i = 1; i <= 75; i++) {
       const estaMarcado = marcados.includes(i)
 
        casas.push(<div key={i} className={`casa ${estaMarcado ? 'ativa' : ''}`} onClick={() => marcarCasa(i)}>{i}</div>)
     }
 
   return (
     <>
       <div className='tabela'>
        {casas}
       </div>
     </>
   )
}
