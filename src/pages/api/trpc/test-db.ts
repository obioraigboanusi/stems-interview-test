import type { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '@utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        const testRecord = await prisma.artistSubmissions.findFirst();
        res.status(200).json({ success: true, data: testRecord });
      } catch (error) {
        console.error('Error accessing database:', error);
        res.status(500).json({ 
          success: false, 
          error: 'Failed to access database', 
          details: error instanceof Error ? error.message : String(error)
        });
      }
    }