import { createProduct, retrieveData } from '@/app/lib/firebase/service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const products = await retrieveData('products');
        const data = products.map((product) => product);
        res?.status(200).json({
            status: 200,
            statusCode: 200,
            message: 'Success',
            data: data,
        });
    }
}
