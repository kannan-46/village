
import React, { useState, useMemo } from 'react';
import { Village } from '../types';
import VillageCard from './VillageCard';
import Modal from './Modal';
import { PlusIcon, SearchIcon } from './icons';

interface VillageListProps {
  villages: Village[];
  onSelectVillage: (id: string) => void;
  onAddVillage: (name: string, nameTamil: string) => void;
  onDeleteVillage: (id: string) => void;
}

const VillageList: React.FC<VillageListProps> = ({ villages, onSelectVillage, onAddVillage, onDeleteVillage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [villageToDelete, setVillageToDelete] = useState<Village | null>(null);
  
  const [newVillageName, setNewVillageName] = useState('');
  const [newVillageNameTamil, setNewVillageNameTamil] = useState('');

  const filteredVillages = useMemo(() => {
    if (!searchTerm) return villages;
    const lowercasedFilter = searchTerm.toLowerCase();
    return villages.filter(village =>
      village.name.toLowerCase().includes(lowercasedFilter) ||
      village.nameTamil.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm, villages]);

  const handleAddVillage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVillageName && newVillageNameTamil) {
      onAddVillage(newVillageName, newVillageNameTamil);
      setNewVillageName('');
      setNewVillageNameTamil('');
      setAddModalOpen(false);
    }
  };

  const confirmDelete = () => {
    if (villageToDelete) {
      onDeleteVillage(villageToDelete.id);
      setVillageToDelete(null);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Village Land Record Manager</h1>
          <p className="mt-2 text-lg text-gray-600">Kovilpatti Sub-Registrar Office</p>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by English or Tamil name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            <PlusIcon />
            Add Village
          </button>
        </div>

        {filteredVillages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVillages.map(village => (
              <VillageCard 
                key={village.id} 
                village={village} 
                onSelect={() => onSelectVillage(village.id)}
                onDelete={() => setVillageToDelete(village)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
             <h3 className="text-xl font-medium text-gray-800">No villages found</h3>
             <p className="mt-2 text-gray-500">Try adjusting your search or add a new village.</p>
          </div>
        )}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Add New Village">
        <form onSubmit={handleAddVillage}>
          <div className="space-y-4">
            <div>
              <label htmlFor="villageName" className="block text-sm font-medium text-gray-700">English Name</label>
              <input 
                type="text" 
                id="villageName"
                value={newVillageName}
                onChange={(e) => setNewVillageName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="villageNameTamil" className="block text-sm font-medium text-gray-700">Tamil Name</label>
              <input 
                type="text"
                id="villageNameTamil"
                value={newVillageNameTamil}
                onChange={(e) => setNewVillageNameTamil(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setAddModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Village</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!villageToDelete} onClose={() => setVillageToDelete(null)} title="Confirm Deletion">
        <p>Are you sure you want to delete the village <span className="font-bold">{villageToDelete?.name}</span>? This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setVillageToDelete(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
        </div>
      </Modal>
    </>
  );
};

export default VillageList;
