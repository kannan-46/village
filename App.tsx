
import React, { useState } from 'react';
import VillageList from './components/VillageList';
import VillageDetails from './components/VillageDetails';
import useVillages from './hooks/useVillages';

const App: React.FC = () => {
  const { 
    villages, 
    addVillage, 
    deleteVillage, 
    updateVillage,
    isLoading
  } = useVillages();
  
  const [selectedVillageId, setSelectedVillageId] = useState<string | null>(null);

  const selectedVillage = villages.find(v => v.id === selectedVillageId);

  const handleSelectVillage = (id: string) => {
    setSelectedVillageId(id);
  };

  const handleBackToList = () => {
    setSelectedVillageId(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-700">Loading Village Data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {selectedVillage ? (
        <VillageDetails 
          key={selectedVillage.id} // Re-mount component on village change
          village={selectedVillage} 
          onBack={handleBackToList}
          onUpdateVillage={updateVillage}
        />
      ) : (
        <VillageList 
          villages={villages} 
          onSelectVillage={handleSelectVillage}
          onAddVillage={addVillage}
          onDeleteVillage={deleteVillage}
        />
      )}
    </div>
  );
};

export default App;
