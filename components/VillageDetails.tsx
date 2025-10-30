import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Village, LandRecord, Column } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { parseRecordWithAI } from '../services/geminiService';
import { exportToExcel, parseFromFile } from '../utils/fileUtils';
import RecordTable from './RecordTable';
import Modal from './Modal';
import { ChevronLeftIcon, PlusIcon, MagicWandIcon, UploadIcon, DownloadIcon, SpinnerIcon } from './icons';

interface VillageDetailsProps {
  village: Village;
  onBack: () => void;
  onUpdateVillage: (villageId: string, updatedData: Partial<Village>) => void;
}

const VillageDetails: React.FC<VillageDetailsProps> = ({ village, onBack, onUpdateVillage }) => {
  const [localRecords, setLocalRecords] = useState<LandRecord[]>(village.records);
  const [localColumns, setLocalColumns] = useState<Column[]>(village.columns);
  const [newRecordData, setNewRecordData] = useState<Partial<LandRecord> | null>(null);

  const [isAIParsingModalOpen, setAIParsingModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parsingError, setParsingError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  const debouncedRecords = useDebounce(localRecords, 500);

  useEffect(() => {
    // This effect will run 500ms after the component mounts, and 500ms after localRecords changes.
    // We want to skip the very first run that happens after mount.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    onUpdateVillage(village.id, { records: debouncedRecords });
  }, [debouncedRecords, village.id, onUpdateVillage]);

  // Note: We are not debouncing column changes as they are expected to be infrequent.
  // If column management UI is added, debouncing for columns should be considered.

  const handleRecordChange = (recordId: string, columnId: string, value: any) => {
    setLocalRecords(prevRecords =>
      prevRecords.map(rec =>
        rec.id === recordId ? { ...rec, [columnId]: value } : rec
      )
    );
  };

  const handleDeleteRecord = (recordId: string) => {
    setLocalRecords(prevRecords => prevRecords.filter(rec => rec.id !== recordId));
  };

  const handleAddRecordClick = () => {
    const initialData = localColumns.reduce((acc, col) => {
      acc[col.id] = col.type === 'number' ? 0 : '';
      return acc;
    }, {} as Partial<LandRecord>);
    setNewRecordData(initialData);
  };

  const handleSaveNewRecord = (newRecord: Partial<LandRecord>) => {
    const completeRecord: LandRecord = {
      id: uuidv4(),
      ...localColumns.reduce((acc, col) => ({ ...acc, [col.id]: col.type === 'number' ? 0 : '' }), {}),
      ...newRecord,
    };
    setLocalRecords(prevRecords => [...prevRecords, completeRecord]);
    setNewRecordData(null);
  };

  const handleCancelNewRecord = () => {
    setNewRecordData(null);
  };
  
  const handleAIPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAiPrompt(e.target.value);
    if (parsingError) setParsingError(null);
  };

  const handleParseWithAI = async () => {
    if (!aiPrompt) return;
    setIsParsing(true);
    setParsingError(null);
    try {
      const parsedData = await parseRecordWithAI(aiPrompt, localColumns);
      if (parsedData) {
        setNewRecordData(parsedData);
        setAIParsingModalOpen(false);
        setAiPrompt('');
      } else {
        setParsingError("Could not parse the data. Please check the text and try again.");
      }
    } catch (error) {
      setParsingError(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { columns, records } = await parseFromFile(file);
      const newRecordsWithIds = records.map(rec => ({ ...rec, id: uuidv4() }));
      
      setLocalColumns(columns);
      setLocalRecords(newRecordsWithIds);
      
      // Persist immediately after import
      onUpdateVillage(village.id, { columns, records: newRecordsWithIds });

    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to import file.");
    } finally {
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const handleExport = (fileType: 'xlsx' | 'csv') => {
    exportToExcel(localRecords, localColumns, village.name, fileType);
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{village.name}</h1>
            <p className="text-lg text-gray-500">{village.nameTamil}</p>
          </div>
        </div>
      </header>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Land Records ({localRecords.length})</h2>
          <div className="flex flex-wrap items-center gap-3">
            <button
                onClick={handleAddRecordClick}
                disabled={!!newRecordData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-sm disabled:bg-gray-400"
            >
                <PlusIcon />
                Add Record
            </button>
            <button
                onClick={() => setAIParsingModalOpen(true)}
                disabled={!!newRecordData}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors shadow-sm disabled:bg-gray-400"
            >
                <MagicWandIcon />
                Add with AI
            </button>
            <button
                onClick={triggerFileUpload}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-md hover:bg-gray-200 border border-gray-300 transition-colors"
            >
                <UploadIcon />
                Import
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".xlsx, .csv" className="hidden" />

            <div className="relative group">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-md hover:bg-gray-200 border border-gray-300 transition-colors"
                >
                    <DownloadIcon />
                    Export
                </button>
                <div className="absolute top-full right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity z-10">
                    <a onClick={() => handleExport('xlsx')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Export as XLSX</a>
                    <a onClick={() => handleExport('csv')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Export as CSV</a>
                </div>
            </div>

          </div>
        </div>

        <RecordTable 
          columns={localColumns}
          records={localRecords}
          onRecordChange={handleRecordChange}
          onDeleteRecord={handleDeleteRecord}
          newRecordData={newRecordData}
          onSaveNewRecord={handleSaveNewRecord}
          onCancelNewRecord={handleCancelNewRecord}
        />
      </div>

      <Modal isOpen={isAIParsingModalOpen} onClose={() => setAIParsingModalOpen(false)} title="Add Record with AI">
          <div className="space-y-4">
              <p className="text-sm text-gray-600">
                  Enter the land record details in any format. The AI will attempt to extract the information and fill the fields for you.
              </p>
              <p className="text-sm text-gray-600">
                  Example: "Survey number 123/B in Gandhi Nagar, owned by R. Kumar, value is 1800 per square meter."
              </p>
              <div>
                  <textarea
                      rows={5}
                      value={aiPrompt}
                      onChange={handleAIPromptChange}
                      placeholder="Paste or type record details here..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
              </div>
              {parsingError && <p className="text-sm text-red-600">{parsingError}</p>}
          </div>
          <div className="mt-6 flex justify-end items-center gap-3">
              <button type="button" onClick={() => setAIParsingModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
              <button
                  type="button"
                  onClick={handleParseWithAI}
                  disabled={isParsing || !aiPrompt}
                  className="px-4 py-2 w-32 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center disabled:bg-gray-400"
              >
                  {isParsing ? <SpinnerIcon className="w-5 h-5" /> : 'Parse Data'}
              </button>
          </div>
      </Modal>
    </div>
  );
};

export default VillageDetails;
