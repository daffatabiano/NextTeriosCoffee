import { updateData } from '@/lib/firebase/service';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
    const body = await req.json();
    async (err: any, decoded: any) => {
        if (decoded) {
            const res = await updateData(decoded.id, { cart: body });
            if (res) {
                return NextResponse.json({
                    status: 200,
                    message: 'Success',
                    data: res,
                });
            } else {
                return NextResponse.json({
                    status: 404,
                    message: 'Data not found',
                });
            }
        }
    };
}
