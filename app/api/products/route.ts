import { createProduct, retrieveData } from '@/app/lib/firebase/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const apiKey = req.headers.get('apiKey');
    const validApi = apiKey === process.env.NEXT_PUBLIC_API_KEY;
    if (!validApi) {
        return new Response('Unauthorized', { status: 401 });
    } else {
        const data = await retrieveData('products');
        return NextResponse.json({
            status: 200,
            message: 'Success',
            data: data,
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        const apiKey = req.headers.get('apiKey');
        const validApi = apiKey === process.env.NEXT_PUBLIC_API_KEY;
        if (!validApi) {
            return new Response('Unauthorized', { status: 401 });
        } else {
            const body = await req.json();
            const data = await createProduct(body);
            return NextResponse.json({
                status: 200,
                message: 'Success',
                data: data,
            });
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'Error',
            error: error,
        });
    }
}
