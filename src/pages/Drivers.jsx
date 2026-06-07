import React, { useState } from 'react';
import EntityList from '../components/crud/EntityList';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';

const initialDrivers = [
  { id: 1, name: 'João Silva Santos', sub: 'CPF: ***234.567-** · CNH: 01234567890 · Cat. D · Val: 12/2027', status: 'Ativo', color: 'bg-blue-600' },
  { id: 2, name: 'Marcos Lima Ferreira', sub: 'CPF: ***891.234-** · CNH: 09876543210 · Cat. D · Val: 08/2028', status: 'Ativo', color: 'bg-violet-600' },
  { id: 3, name: 'Pedro Alves Costa', sub: 'CPF: ***567.890-** · CNH: 11223344556 · Cat. D · Val: 03/2024', status: 'Vencida', color: 'bg-slate-400' },
  { id: 4, name: 'Antônio Souza Neto', sub: 'CPF: ***345.678-** · CNH: 55443322110 · Cat. D · Val: 06/2026', status: 'Inativo', color: 'bg-slate-600' },
];

const DriversPage = () => {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [formData, setFormData] = useState({ name: '', sub: '', status: 'Ativo' });

  const handleOpenAdd = () => {
    setEditingDriver(null);
    setFormData({ name: '', sub: '', status: 'Ativo' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (driver) => {
    setEditingDriver(driver);
    setFormData({ name: driver.name, sub: driver.sub, status: driver.status });
    setIsModalOpen(true);
  };

  const handleDelete = (driver) => {
    if (window.confirm(`Tem certeza que deseja excluir ${driver.name}?`)) {
      setDrivers(drivers.filter(d => d.id !== driver.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDriver) {
      setDrivers(drivers.map(d => d.id === editingDriver.id ? { ...d, ...formData } : d));
    } else {
      const newDriver = {
        ...formData,
        id: Date.now(),
        color: 'bg-blue-600'
      };
      setDrivers([...drivers, newDriver]);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <EntityList
        title="Motoristas Cadastrados"
        entities={drivers}
        onAdd={handleOpenAdd}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        onView={(d) => alert(`Detalhes do Motorista:\n${d.name}\n${d.sub}`)}
        renderAvatar={(item) => (
          <div className={`w-10 h-10 rounded-full ${item.color} text-white flex items-center justify-center font-bold text-xs`}>
            {item.name.substring(0,2).toUpperCase()}
          </div>
        )}
        renderSubtext={(item) => item.sub}
        renderStatus={(item) => (
          <Badge variant={item.status === 'Ativo' ? 'success' : item.status === 'Vencida' ? 'warning' : 'default'}>{item.status}</Badge>
        )}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDriver ? 'Editar Motorista' : 'Novo Motorista'}
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
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Documentos (CPF/CNH)</label>
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
              <option value="Vencida">CNH Vencida</option>
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
              {editingDriver ? 'Salvar Alterações' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default DriversPage;
