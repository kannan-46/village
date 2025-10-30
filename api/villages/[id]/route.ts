import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from '../../lib/dbConnect'
import Village from '../models/villageModel';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await new dbConnect();
  
  const { id } = req.query; // This is the [id] from the filename

  switch (req.method) {
    // PUT /api/villages/[id] - Update a village
    case 'PUT':
      try {
        const updatedData = req.body;
        
        // Add or update the 'updatedAt' timestamp
        updatedData.updatedAt = new Date().toISOString();

        const updatedVillage = await Village.findByIdAndUpdate(
          id, 
          updatedData, 
          {
            new: true, // Return the updated document
            runValidators: true,
          }
        );
        
        if (!updatedVillage) {
          return res.status(404).json({ message: 'Village not found' });
        }
        res.status(200).json(updatedVillage);
      } catch (error) {
        res.status(400).json({ message: 'Error updating village', error });
      }
      break;

    // DELETE /api/villages/[id] - Delete a village
    case 'DELETE':
      try {
        const deletedVillage = await Village.findByIdAndDelete(id);
        if (!deletedVillage) {
          return res.status(404).json({ message: 'Village not found' });
        }
        res.status(200).json({ message: 'Village deleted successfully', id });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting village', error });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
