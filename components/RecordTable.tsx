import React, { useState, useEffect } from 'react';
import { Column, LandRecord } from '../types';
import { TrashIcon, CheckIcon, XIcon } from './icons';

interface RecordTableProps {
  columns: Column[];
  records: LandRecord[];
  onRecordChange: (recordId: string, columnId: string, value: any) => void;
  onDeleteRecord: (recordId: string) => void;
  newRecordData: Partial<LandRecord> | null;
  onSaveNewRecord: (newRecord: Partial<LandRecord>) => void;
  onCancelNewRecord: () => void;
}

const RecordTable: React.FC<RecordTableProps> = ({ 
  columns, 
  records, 
  onRecordChange, 
  onDeleteRecord,
  newRecordData,
  onSaveNewRecord,
  onCancelNewRecord
}) => {

  const [newRecord, setNewRecord] = useState<Partial<LandRecord>>({});

  useEffect(() => {
    if (newRecordData) {
      setNewRecord(newRecordData);
    } else {
      setNewRecord({});
    }
  }, [newRecordData]);

  const handleSaveNewRecord = () => {
    onSaveNewRecord(newRecord);
    setNewRecord({});
  };
  
  const handleCancelNewRecord = () => {
    onCancelNewRecord();
    setNewRecord({});
  };

  const NewRecordRow = () => {
    if (!newRecordData) return null;

    return (
        <tr className="bg-blue-50">
            {columns.map(col => (
                <td key={col.id} className="p-2 border-b border-gray-200">
                    <input
                        type={col.type === 'number' ? 'number' : 'text'}
                        value={newRecord[col.id] || ''}
                        onChange={(e) => setNewRecord(prev => ({ ...prev, [col.id]: e.target.value }))}
                        className="w-full px-2 py-1 border border-blue-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    />
                </td>
            ))}
            <td className="p-2 border-b border-gray-200 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <button onClick={handleSaveNewRecord} className="p-2 text-green-600 hover:bg-green-100 rounded-full"><CheckIcon /></button>
                    <button onClick={handleCancelNewRecord} className="p-2 text-red-600 hover:bg-red-100 rounded-full"><XIcon /></button>
                </div>
            </td>
        </tr>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
      {records.length === 0 && !newRecordData ? (
        <div className="text-center p-12 text-gray-500">
          <p className="font-medium">No records found for this village.</p>
          <p className="text-sm">Use the buttons above to add a new record.</p>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th key={col.id} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {col.name}
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map(record => (
              <tr key={record.id} className="hover:bg-gray-50">
                {columns.map(col => (
                  <td key={col.id} className="p-2 border-b border-gray-200">
                    <input
                      type={col.type === 'number' ? 'number' : 'text'}
                      value={record[col.id] || ''}
                      onChange={(e) => onRecordChange(record.id, col.id, col.type === 'number' ? Number(e.target.value) : e.target.value)}
                      className="w-full px-2 py-1 border border-transparent rounded-md hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-gray-800"
                    />
                  </td>
                ))}
                <td className="p-2 border-b border-gray-200">
                  <button onClick={() => onDeleteRecord(record.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
             <NewRecordRow />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecordTable;