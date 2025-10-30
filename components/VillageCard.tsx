
import React from 'react';
import { Village } from '../types';
import { TrashIcon } from './icons';

interface VillageCardProps {
  village: Village;
  onSelect: () => void;
  onDelete: () => void;
}

const VillageCard: React.FC<VillageCardProps> = ({ village, onSelect, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div 
      className="group relative bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-blue-700 truncate">{village.name}</h3>
        <p className="text-gray-600">{village.nameTamil}</p>
        <p className="mt-4 text-sm text-gray-500">{village.records.length} records</p>
      </div>
      <button
        onClick={handleDelete}
        className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-200 transition-opacity duration-300"
        aria-label={`Delete ${village.name}`}
      >
        <TrashIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default VillageCard;
