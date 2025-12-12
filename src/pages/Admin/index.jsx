import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../../components/Header';
import './Admin.css';

export const Admin = () => {
  const [patrocinador, setPatrocinador] = useState('');
  const [imagem, setImagem] = useState(null);
  const [lista, setLista] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  
  // 1. Criamos uma referência para o input de arquivo
  const fileInputRef = useRef(null);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('patrocinadores') || '[]');
    setLista(dados);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagem({
          name: Date.now() + '-' + file.name,
          buffer: reader.result
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const salvar = async (e) => {
    e.preventDefault();
    if (!patrocinador) return alert('Preencha o nome');

    let nomeImagemSalva = null;

    if (imagem && window.electronAPI) {
      const result = await window.electronAPI.saveImage(imagem.name, imagem.buffer);
      if (result.success) {
        nomeImagemSalva = imagem.name;
      } else {
        alert('Erro ao salvar imagem');
        return;
      }
    }

    const novoItem = {
      id: editandoId || Date.now(),
      nome: patrocinador,
      img: nomeImagemSalva || (editandoId ? lista.find(i => i.id === editandoId).img : '')
    };

    let novaLista;
    if (editandoId) {
      novaLista = lista.map(item => item.id === editandoId ? novoItem : item);
      setEditandoId(null);
    } else {
      novaLista = [...lista, novoItem];
    }

    setLista(novaLista);
    localStorage.setItem('patrocinadores', JSON.stringify(novaLista));
    
    // LIMPAR FORMULÁRIO
    setPatrocinador('');
    setImagem(null);
    setEditandoId(null); // Importante limpar o ID de edição também
    
    // 2. Limpamos o input usando a referência do React
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    alert('Salvo com sucesso!');
  };

  const deletar = (id) => {
    const novaLista = lista.filter(item => item.id !== id);
    setLista(novaLista);
    localStorage.setItem('patrocinadores', JSON.stringify(novaLista));
  };

  const editar = (item) => {
    setPatrocinador(item.nome);
    setEditandoId(item.id);
    // Nota: O input de arquivo não é preenchido automaticamente por segurança do navegador
  };

  return (
    <div className="admin-container">
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2>Gerenciar Patrocinadores</h2>
        
        <form onSubmit={salvar} className="bingo-form" style={{ marginBottom: '2rem' }}>
          <div className="input-group">
            <label>Nome do Patrocinador</label>
            <input 
              value={patrocinador} 
              onChange={e => setPatrocinador(e.target.value)} 
              className="bingo-input"
              placeholder="Digite o nome..."
            />
          </div>
          <div className="input-group">
            <label>Banner (Imagem)</label>
            <input 
              ref={fileInputRef}  // 3. Conectamos a referência aqui
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="bingo-input"
            />
          </div>
          <button type="submit" className="bingo-button">
            {editandoId ? 'Atualizar' : 'Adicionar'}
          </button>
        </form>

        <div className="lista-cards">
          {lista.map(item => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem', background: 'white' }}>
              {item.img && (
                <img 
                  src={`media://${item.img}`} 
                  alt="preview" 
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} 
                />
              )}
              <div style={{ flex: 1 }}>
                <h3>{item.nome}</h3>
              </div>
              <div>
                <button type="button" onClick={() => editar(item)} style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}>Editar</button>
                <button type="button" onClick={() => deletar(item.id)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Deletar</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};