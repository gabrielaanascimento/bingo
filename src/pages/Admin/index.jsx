import React, { useEffect, useRef, useState } from 'react';
import { Header } from '../../components/Header';
import { Modal } from '../../components/Modal';
import './Admin.css';

const STORAGE_KEY = 'patrocinadores';

export const Admin = () => {
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState(null);
  const [lista, setLista] = useState([]);
  const [editId, setEditId] = useState(null);

  const [modal, setModal] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const fileRef = useRef(null);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setLista(dados);
  }, []);

 
  const openModal = (title, message, onConfirm = null) => {
    setModal({ open: true, title, message, onConfirm });
  };

  const closeModal = () => {
    setModal({ open: false, title: '', message: '', onConfirm: null });
  };

  const resetForm = () => {
    setNome('');
    setImagem(null);
    setEditId(null);
    if (fileRef.current) fileRef.current.value = '';
  };

   const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagem({
        name: `${Date.now()}-${file.name}`,
        buffer: reader.result
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const salvarImagem = async () => {
    if (!imagem || !window.electronAPI) return null;

    const result = await window.electronAPI.saveImage(
      imagem.name,
      imagem.buffer
    );

    if (!result.success) {
      openModal('Erro', 'Erro ao salvar imagem');
      return null;
    }

    return imagem.name;
  };

  const salvar = async (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      openModal('Atenção', 'Informe o nome do patrocinador');
      return;
    }

    const imgSalva = await salvarImagem();

    const novoItem = {
      id: editId ?? Date.now(),
      nome,
      img: imgSalva ?? lista.find(i => i.id === editId)?.img ?? ''
    };

    const novaLista = editId
      ? lista.map(item => item.id === editId ? novoItem : item)
      : [...lista, novoItem];

    setLista(novaLista);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));

    resetForm();
    openModal('Sucesso', 'Patrocinador salvo com sucesso!');
  };

  const editar = (item) => {
    setNome(item.nome);
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deletar = (id) => {
    openModal(
      'Confirmar exclusão',
      'Deseja realmente remover este patrocinador?',
      () => {
        const novaLista = lista.filter(item => item.id !== id);
        setLista(novaLista);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
        closeModal();
      }
    );
  };


  return (
    <div className="admin-container">

      <div className="admin-content">
        <h2 className="admin-header-title">Gerenciar Patrocinadores</h2>

        <form onSubmit={salvar} className="bingo-form">
          <div className="input-group">
            <label>Nome do Patrocinador</label>
            <input
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="bingo-input"
              placeholder="Digite o nome..."
            />
          </div>

          <div className="input-group">
            <label>Banner (Imagem)</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              onClick={e => (e.target.value = null)}
              className="bingo-input"
            />
          </div>

          <button type="submit" className="bingo-button">
            {editId ? 'Atualizar' : 'Adicionar'}
          </button>
        </form>

        <div className="lista-cards">
          {lista.map(item => (
            <div key={item.id} className="card-item">
              {item.img && (
                <img
                  src={`media://${item.img}`}
                  alt={item.nome}
                  className="card-thumb"
                />
              )}

              <div className="card-info">
                <h3>{item.nome}</h3>
              </div>

              <div className="card-actions">
                <button onClick={() => editar(item)}>Editar</button>
                <button
                  onClick={() => deletar(item.id)}
                  className="btn-delete"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
        onConfirm={modal.onConfirm}
      />
    </div>
  );
};
