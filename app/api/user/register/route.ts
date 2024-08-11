import { createAccount } from '@/lib/firebase/service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const status: { status: boolean; message: string } = await createAccount(
        body
    );
    const dataMember = {
        email: body.email,
        username: body.username,
    };

    if (status) {
        return NextResponse.json(
            {
                status: true,
                statusCode: 200,
                message: 'success',
                data: dataMember,
            },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            {
                status: false,
                statusCode: 400,
                message: 'fail',
            },
            { status: 400 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        {
            status: false,
            statusCode: 405,
            message: 'method not allowed',
        },
        { status: 405 }
    );
}
