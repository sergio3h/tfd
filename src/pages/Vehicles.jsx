import React, { useState } from 'react';
import EntityList from '../components/crud/EntityList';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';

const initialVehicles = [
  { id: 1, name: 'PBR-2341', sub: 'Ônibus — Mercedes-Benz OF 1721 · Ano: 2018 · Cap: 42 lugares', status: 'Ativo', icon: '🚌', color: 'bg-teal-600' },
  { id: 2, name: 'MRZ-1190', sub: 'Van — Sprinter 415 · Ano: 2021 · Cap: 16 lugares', status: 'Ativo', icon: '🚐', color: 'bg-sky-600' },
  { id: 3, name: 'JOA-5512', sub: 'Van — Sprinter 415 · Ano: 2019 · Cap: 16 lugares', status: 'Manutenção', icon: '🚐', color: 'bg-amber-600' },
  { id: 4, name: 'SOA-8834', sub: 'Ônibus — Volkswagen 17.230 · Ano: 2015 · Cap: 38 lugares', status: 'Inativo', icon: '🚌', color: 'bg-slate-600' },
];

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({ name: '', sub: '', status: 'Ativo' });

  const handleOpenAdd = () => {
    setEditingVehicle(null);
    setFormData({ name: '', sub: '', status: 'Ativo' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({ name: vehicle.name, sub: vehicle.sub, status: vehicle.status });
    setIsModalOpen(true);
  };

  const handleDelete = (vehicle) => {
    if (window.confirm(`Tem certeza que deseja excluir o veículo ${vehicle.name}?`)) {
      setVehicles(vehicles.filter(v => v.id !== vehicle.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingVehicle) {
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? { ...v, ...formData } : v));
    } else {
      const newVehicle = {
        ...formData,
        id: Date.now(),
        icon: '🚌',
        color: 'bg-teal-600'
      };
      setVehicles([...vehicles, newVehicle]);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <EntityList
        title="Veículos Cadastrados"
        entities={vehicles}
        onAdd={handleOpenAdd}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        onView={(v) => alert(`Detalhes do Veículo:\n${v.name}\n${v.sub}`)}
        renderAvatar={(item) => (
          <div className={`w-10 h-10 rounded-lg ${item.color} text-white flex items-center justify-center font-bold text-lg`}>
            {item.icon}
          </div>
        )}
        renderSubtext={(item) => item.sub}
        renderStatus={(item) => (
          <Badge variant={item.status === 'Ativo' ? 'success' : item.status === 'Manutenção' ? 'warning' : 'default'}>{item.status}</Badge>
        )}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVehicle ? 'Editar Veículo' : 'Novo Veículo'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Placa</label>
            <input
              required
              className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value.toUpperCase()})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Modelo / Detalhes</label>
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
              <option value="Manutenção">Manutenção</option>
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
              {editingVehicle ? 'Salvar Alterações' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default VehiclesPage;
