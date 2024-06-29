import axios from 'axios';

export async function postData(url: string, data: any) {
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': process.env.NEXT_PUBLIC_API_KEY,
                Accept: 'application/json',
                'Cache-Control': 'no-cache',
            },
        });
        return response;
    } catch (error) {
        return error;
    }
}
