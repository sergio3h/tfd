import React, { useState } from 'react';
import EntityList from '../components/crud/EntityList';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';

const initialPassengers = [
  { id: 1, name: 'Maria da Silva Souza', sub: 'CPF: ***123.456-** · Cart. SUS: 898765432100001', status: 'Ativo', color: 'bg-blue-500' },
  { id: 2, name: 'José Oliveira Neto', sub: 'CPF: ***234.567-** · Cart. SUS: 712345678900002', status: 'Ativo', color: 'bg-purple-500' },
  { id: 3, name: 'Ana Martins Ferreira', sub: 'CPF: ***345.678-** · Cart. SUS: 634567890100003', status: 'Inativo', color: 'bg-orange-500' },
  { id: 4, name: 'Raimundo Lima Costa', sub: 'CPF: ***456.789-** · Cart. SUS: 556789012300004', status: 'Ativo', color: 'bg-emerald-500' },
];

const PassengersPage = () => {
  const [passengers, setPassengers] = useState(initialPassengers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState(null);
  const [formData, setFormData] = useState({ name: '', sub: '', status: 'Ativo' });

  const handleOpenAdd = () => {
    setEditingPassenger(null);
    setFormData({ name: '', sub: '', status: 'Ativo' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (passenger) => {
    setEditingPassenger(passenger);
    setFormData({ name: passenger.name, sub: passenger.sub, status: passenger.status });
    setIsModalOpen(true);
  };

  const handleDelete = (passenger) => {
    if (window.confirm(`Tem certeza que deseja excluir ${passenger.name}?`)) {
      setPassengers(passengers.filter(p => p.id !== passenger.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPassenger) {
      setPassengers(passengers.map(p => p.id === editingPassenger.id ? { ...p, ...formData } : p));
    } else {
      const newPassenger = {
        ...formData,
        id: Date.now(),
        color: 'bg-blue-500'
      };
      setPassengers([...passengers, newPassenger]);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <EntityList
        title="Passageiros Cadastrados"
        entities={passengers}
        onAdd={handleOpenAdd}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        onView={(p) => alert(`Detalhes de ${p.name}\n${p.sub}`)}
        renderAvatar={(item) => (
          <div className={`w-10 h-10 rounded-full ${item.color} text-white flex items-center justify-center font-bold text-xs`}>
            {item.name.substring(0,2).toUpperCase()}
          </div>
        )}
        renderSubtext={(item) => item.sub}
        renderStatus={(item) => (
          <Badge variant={item.status === 'Ativo' ? 'success' : 'warning'}>{item.status}</Badge>
        )}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPassenger ? 'Editar Passageiro' : 'Novo Passageiro'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome Completo</label>
            <input
              required
              className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">CPF / Cartão SUS</label>
            <input
              required
              className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.sub}
              onChange={(e) => setFormData({...formData, sub: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
            <select
              className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-700 text-white text-sm font-bold rounded-lg hover:bg-blue-800 transition-colors"
            >
              {editingPassenger ? 'Salvar Alterações' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PassengersPage;
