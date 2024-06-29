import { retrieveDataById, updateProduct } from '@/app/lib/firebase/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const apiKey = request.headers.get('apiKey');
    const validApi = apiKey === process.env.NEXT_PUBLIC_API_KEY;
    if (!validApi) {
        return new Response('Unauthorized', { status: 401 });
    } else {
        const { id } = params;
        const data = await retrieveDataById('products', id);
        if (data) {
            return NextResponse.json({
                status: 200,
                message: 'Success',
                data: data,
            });
        } else {
            return NextResponse.json({
                status: 404,
                message: 'Data not found',
            });
        }
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const apiKey = req.headers.get('apiKey');
    const validApi = apiKey === process.env.NEXT_PUBLIC_API_KEY;
    if (!validApi) {
        return new Response('Unauthorized', { status: 401 });
    } else {
        const { id } = params;
        const body = await req.json();
        const data = await updateProduct(id, body);
        if (data) {
            return NextResponse.json({
                status: 200,
                message: 'Success',
                data: data,
            });
        } else {
            return NextResponse.json({
                status: 404,
                message: 'Data not found',
            });
        }
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const apiKey = req.headers.get('apiKey');
    const validApi = apiKey === process.env.NEXT_PUBLIC_API_KEY;
    if (!validApi) {
        return new Response('Unauthorized', { status: 401 });
    } else {
        const { id } = params;
        const data = await retrieveDataById('products', id);
        if (data) {
            return NextResponse.json({
                status: 200,
                message: 'Success',
                data: data,
            });
        } else {
            return NextResponse.json({
                status: 404,
                message: 'Data not found',
            });
        }
    }
}
