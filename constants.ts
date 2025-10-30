import { v4 as uuidv4 } from 'uuid';
import { Column, LandRecord } from './types';

// Updated default columns to be more relevant to land records.
export const DEFAULT_COLUMNS: Column[] = [
  { id: 'areaName', name: 'Area Name', type: 'text' },
  { id: 'nagarName', name: 'Nagar Name', type: 'text' },
  { id: 'surveyNumber', name: 'Survey Number', type: 'text' },
  { id: 'valuePerSqm', name: 'Value (₹/sq.m)', type: 'number' },
  { id: 'ownerName', name: 'Owner Name', type: 'text' },
];

// Seed records for Kovilpatti based on the user-provided spreadsheet.
const kovilpattiRecords: LandRecord[] = [
  { id: uuidv4(), areaName: "Main Bazaar", nagarName: "Gandhi Nagar", surveyNumber: "101/A", valuePerSqm: 1500, ownerName: "A. Kumar" },
  { id: uuidv4(), areaName: "Ettayapuram Road", nagarName: "Anna Nagar", surveyNumber: "205/B", valuePerSqm: 1200, ownerName: "S. Selvi" },
  { id: uuidv4(), areaName: "Near Bus Stand", nagarName: "Kamaraj Nagar", surveyNumber: "315/C", valuePerSqm: 2000, ownerName: "R. Murugan" },
  { id: uuidv4(), areaName: "Railway Nagar", nagarName: "Bharathi Nagar", surveyNumber: "608/E", valuePerSqm: 1447, ownerName: "M. Varma" },
  { id: uuidv4(), areaName: "Lake View", nagarName: "Subhash Nagar", surveyNumber: "477/B", valuePerSqm: 1126, ownerName: "K. Murthy" },
  { id: uuidv4(), areaName: "Railway Nagar", nagarName: "Bose Nagar", surveyNumber: "199/E", valuePerSqm: 1414, ownerName: "K. Murthy" },
  { id: uuidv4(), areaName: "South Bypass", nagarName: "Subhash Nagar", surveyNumber: "244/B", valuePerSqm: 1383, ownerName: "L. Devi" },
  { id: uuidv4(), areaName: "South Bypass", nagarName: "Bose Nagar", surveyNumber: "959/B", valuePerSqm: 1219, ownerName: "S. Anand" },
  { id: uuidv4(), areaName: "Park Street", nagarName: "Patel Nagar", surveyNumber: "517/A", valuePerSqm: 2240, ownerName: "S. Anand" },
  { id: uuidv4(), areaName: "Park Street", nagarName: "Tilak Nagar", surveyNumber: "406/B", valuePerSqm: 2124, ownerName: "V. Sita" },
  { id: uuidv4(), areaName: "Railway Nagar", nagarName: "Tilak Nagar", surveyNumber: "459/B", valuePerSqm: 1742, ownerName: "V. Sita" },
  { id: uuidv4(), areaName: "Railway Nagar", nagarName: "Bharathi Nagar", surveyNumber: "997/A", valuePerSqm: 1539, ownerName: "L. Devi" },
  { id: uuidv4(), areaName: "North Colony", nagarName: "Patel Nagar", surveyNumber: "101/D", valuePerSqm: 1285, ownerName: "V. Sita" },
  { id: uuidv4(), areaName: "South Bypass", nagarName: "Subhash Nagar", surveyNumber: "216/F", valuePerSqm: 1251, ownerName: "L. Devi" },
  { id: uuidv4(), areaName: "Old Town", nagarName: "Bharathi Nagar", surveyNumber: "178/F", valuePerSqm: 1343, ownerName: "K. Murthy" },
  { id: uuidv4(), areaName: "East Gate", nagarName: "Azad Nagar", surveyNumber: "953/F", valuePerSqm: 901, ownerName: "G. Ramesh" },
  { id: uuidv4(), areaName: "North Colony", nagarName: "Bose Nagar", surveyNumber: "672/F", valuePerSqm: 2128, ownerName: "L. Devi" },
  { id: uuidv4(), areaName: "Railway Nagar", nagarName: "Subhash Nagar", surveyNumber: "935/D", valuePerSqm: 1331, ownerName: "G. Ramesh" },
  { id: uuidv4(), areaName: "North Colony", nagarName: "Patel Nagar", surveyNumber: "808/D", valuePerSqm: 1306, ownerName: "P. Rajan" },
  { id: uuidv4(), areaName: "Lake View", nagarName: "Nehru Nagar", surveyNumber: "840/C", valuePerSqm: 1986, ownerName: "G. Ramesh" },
];


// Seed data for all 36 villages under Kovilpatti Sub-Registrar Office.
// `id`, `createdAt`, and `updatedAt` for villages are added by the `useVillages` hook.
export const SEED_VILLAGES = [
  { name: 'Kovilpatti', nameTamil: 'கோவில்பட்டி', columns: [...DEFAULT_COLUMNS], records: kovilpattiRecords },
  { name: 'Ahilandapuram', nameTamil: 'அகிலாண்டபுரம்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Alampatti', nameTamil: 'ஆலம்பட்டி', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Avalnatham', nameTamil: 'ஆவல்நத்தம்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Ayyanaruthu', nameTamil: 'அய்யனாரூத்து', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Chidambarapuram', nameTamil: 'சிதம்பராபுரம்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Chithrampatti', nameTamil: 'சித்ராம்பட்டி', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Duraiyur', nameTamil: 'துறையூர்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Edayankulam', nameTamil: 'இடையன்குளம்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Ettayapuram', nameTamil: 'எட்டயபுரம்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Ilambuvanam', nameTamil: 'இளம்புவனம்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Iluppaiyurani', nameTamil: 'இலுப்பையூரணி', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Inam Maniyachi', nameTamil: 'இனாம் மணியாச்சி', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Kadalaiyur', nameTamil: 'கடலையூர்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Kalampatti', nameTamil: 'களம்பட்டி', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Kamanaickenpatti', nameTamil: 'காமநாயக்கன்பட்டி', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Kappulingampatti', nameTamil: 'கப்பலிங்கம்பட்டி', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Keelamangalam', nameTamil: 'கீழமங்கலம்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Keeleral', nameTamil: 'கீழ ஈரால்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Kodukkamparai', nameTamil: 'கொடுக்குப்பாறை', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Lingampatti', nameTamil: 'லிங்கம்பட்டி', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Maniyachikaranpatti', nameTamil: 'மணியாச்சிக்காரன்பட்டி', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Melamandai', nameTamil: 'மேலமந்தை', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Meleral', nameTamil: 'மேல் ஈரால்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Mudukkumeendanpatti', nameTamil: 'முடுக்குமீண்டான்பட்டி', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Mukkuttumalai', nameTamil: 'முக்குட்டுமலை', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Naduvirpatti', nameTamil: 'நடுவிற்பட்டி', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Nakkalamuthanpatti', nameTamil: 'நக்கலமுத்தன்பட்டி', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Nalattinputhur', nameTamil: 'நாலட்டின்புதூர்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Ramachandrapuram', nameTamil: 'ராமச்சந்திரபுரம்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Sindalakkarai', nameTamil: 'சிந்தலக்கரை', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Theethampatti', nameTamil: 'தீத்தம்பட்டி', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Thonugal', nameTamil: 'தொனுகால்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Thurkkamiyidal', nameTamil: 'துர்க்காமியிடல்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Usilankulam', nameTamil: 'உசிலங்குளம்', columns: [...DEFAULT_COLUMNS], records: [] },
  { name: 'Villiseri', nameTamil: 'வில்லிசேரி', columns: [...DEFAULT_COLUMNS], records: [] },
];
