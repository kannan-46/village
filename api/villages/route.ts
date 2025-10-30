import { v4 as uuidv4 } from 'uuid';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from '../lib/dbConnect';
import Village from '../models/villageModel';
import { SEED_VILLAGES, DEFAULT_COLUMNS } from '../../constants'

/**
 * Seeds the database with initial data if it's empty.
 */
const seedDatabase = async () => {
  try {
    const count = await Village.countDocuments();
    if (count > 0) {
      // console.log('Database already seeded. Skipping.');
      return;
    }

    console.log('Seeding database with initial village data...');
    const now = new Date().toISOString();
    const villagesToSeed = SEED_VILLAGES.map(village => ({
      ...village,
      createdAt: now,
      updatedAt: now,
      // Note: Mongoose will add _id, our virtual 'id' will use it
    }));
    
    await Village.insertMany(villagesToSeed);
    console.log('Database seeded successfully.');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await new dbConnect();

  switch (req.method) {
    // GET /api/villages - Get all villages
    case 'GET':
      try {
        // Run seed check every time. It will only run if DB is empty.
        await seedDatabase(); 
        
        const villages = await Village.find({});
        res.status(200).json(villages);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching villages', error });
      }
      break;

    // POST /api/villages - Add a new village
    case 'POST':
      try {
        const { name, nameTamil } = req.body;
        if (!name || !nameTamil) {
          return res.status(400).json({ message: 'Name and Tamil name are required.' });
        }
        const now = new Date().toISOString();
        const newVillage = new Village({
          name,
          nameTamil,
          columns: DEFAULT_COLUMNS,
          records: [],
          createdAt: now,
          updatedAt: now,
        });
        await newVillage.save();
        res.status(201).json(newVillage);
      } catch (error) {
        res.status(400).json({ message: 'Error creating village', error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
