import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import { LandRecord, Column } from '../types';

/**
 * Exports data to an Excel (XLSX) or CSV file.
 * @param records - The land records to export.
 * @param columns - The column definitions.
 * @param sheetName - The name for the worksheet.
 * @param fileType - The type of file to export ('xlsx' or 'csv').
 */
export const exportToExcel = (
  records: LandRecord[],
  columns: Column[],
  sheetName: string,
  fileType: 'xlsx' | 'csv'
): void => {
  // Map records to an array of objects with keys as column names
  const dataToExport = records.map(record => {
    const row: { [key: string]: any } = {};
    columns.forEach(col => {
      row[col.name] = record[col.id] ?? ''; // Use column name as header
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const fileName = `${sheetName.replace(/ /g, '_')}_land_records.${fileType}`;
  XLSX.writeFile(workbook, fileName);
};

/**
 * Parses data from an Excel or CSV file using a more robust method.
 * @param file - The file to parse.
 * @returns A promise that resolves with the parsed columns and records.
 */
export const parseFromFile = (file: File): Promise<{ columns: Column[], records: Omit<LandRecord, 'id'>[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        if (!data) {
          throw new Error("File content is empty.");
        }
        // Use ArrayBuffer for more robust parsing
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        // Use header: 1 to get an array of arrays, which is better for type inference
        const json: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });

        if (json.length < 1) { // Must have at least a header row
          resolve({ columns: [], records: [] });
          return;
        }

        const headers = json[0].filter(h => h !== null && h !== ''); // Filter out empty headers
        const dataRows = json.length > 1 ? json.slice(1) : [];
        const headerIndexMap = headers.map(h => json[0].indexOf(h));

        const columns: Column[] = headers.map((header, i) => {
          const originalIndex = headerIndexMap[i];
          // Check if all values in this column are numeric (or null/empty)
          const isNumeric = dataRows.every(row => {
            const value = row[originalIndex];
            return value === null || value === '' || (typeof value !== 'boolean' && !isNaN(Number(value)));
          });
          
          return {
            id: header.toLowerCase().replace(/[^a-z0-9]/gi, '') + `_${uuidv4().substring(0, 5)}`,
            name: String(header),
            type: isNumeric ? 'number' : 'text',
          };
        });

        const records: Omit<LandRecord, 'id'>[] = dataRows.map(row => {
          const record: { [key: string]: any } = {};
          columns.forEach((col, i) => {
            const originalIndex = headerIndexMap[i];
            const rawValue = row[originalIndex];
            if (col.type === 'number' && rawValue !== null) {
              const num = Number(rawValue);
              record[col.id] = isNaN(num) ? null : num; // Store as number or null
            } else {
              record[col.id] = rawValue === null ? '' : String(rawValue);
            }
          });
          return record;
        });
        
        resolve({ columns, records });

      } catch (error) {
        console.error("Error parsing file:", error);
        reject(new Error("Failed to parse the file. It might be corrupted or in an unsupported format."));
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      reject(error);
    };

    // Use readAsArrayBuffer for better compatibility
    reader.readAsArrayBuffer(file);
  });
};