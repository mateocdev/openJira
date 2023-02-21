import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = {
    message: string
} | IEntry[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res);
            break;
    
        default:
            return res.status(400).json({ message: 'Bad Request' })
    }

}

const getEntries = async(res: NextApiResponse<Data>) => {
    await db.connectToDatabase();
    const entries = await Entry.find().sort({ createdAt: 'ascending' });
    // await db.disconnectDatabase();

    return res.status(200).json(entries);
}