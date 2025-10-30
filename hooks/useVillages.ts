import { useState, useEffect, useCallback } from 'react';
import { Village } from '../types';


const useVillages = () => {
  const [villages, setVillages] = useState<Village[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data from the backend on component mount
  useEffect(() => {
    const fetchVillages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/villages'); // Call our new API route
        
        if (!response.ok) {
          throw new Error('Failed to fetch villages from server.');
        }
        
        const data: Village[] = await response.json();
        setVillages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVillages();
  }, []); // Empty dependency array means this runs once

  // Add a new village
  const addVillage = useCallback(async (name: string, nameTamil: string) => {
    try {
      const response = await fetch('/api/villages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, nameTamil }),
      });

      if (!response.ok) {
        throw new Error('Failed to add village.');
      }

      const newVillage: Village = await response.json();
      setVillages((prevVillages) => [...prevVillages, newVillage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add village');
      console.error(err);
    }
  }, []); // No longer depends on 'villages' state

  // Delete a village
  const deleteVillage = useCallback(async (villageId: string) => {
    try {
      const response = await fetch(`/api/villages/${villageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete village.');
      }
      
      // Update state optimistically
      setVillages((prevVillages) => prevVillages.filter((v) => v.id !== villageId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete village');
      console.error(err);
      // You could add logic here to revert the optimistic update if the API fails
    }
  }, []); // No longer depends on 'villages' state

  // Update a village
  const updateVillage = useCallback(async (villageId: string, updatedData: Partial<Village>) => {
    try {
      const response = await fetch(`/api/villages/${villageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update village.');
      }

      const returnedVillage: Village = await response.json();
      
      // Update the village in our local state
      setVillages((prevVillages) =>
        prevVillages.map((v) => (v.id === returnedVillage.id ? returnedVillage : v))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update village');
      console.error(err);
    }
  }, []); // No longer depends on 'villages' state

  return {
    villages,
    isLoading,
    addVillage,
    deleteVillage,
    updateVillage,
    error, // You can display this error in your App.tsx if you want
  };
};

export default useVillages;
