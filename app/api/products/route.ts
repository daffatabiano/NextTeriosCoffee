import { retrieveData } from '@/lib/firebase/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const data = await retrieveData('products');
        const productsData = data;
        console.log(data);

        if (!productsData) {
            return NextResponse.json(
                { error: 'Images not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            status: 200,
            message: 'Success',
            data: productsData,
        });
    } catch (error) {
        console.error('Error fetching data from Firestore', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
