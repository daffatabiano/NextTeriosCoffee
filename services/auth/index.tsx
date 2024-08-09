import instance from '@/lib/axios/instance';

const authServices = {
    register: (d: any) =>
        instance.post('api/user/register', d, {
            headers: {
                Accept: 'application/json',
                apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            },
        }),
};

export default authServices;
