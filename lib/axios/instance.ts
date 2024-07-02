import axios from 'axios';

const Headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    ApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
};

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_FIREBASE_API_URL,
    headers: Headers,
    timeout: 60 * 1000,
});

instance.interceptors.response.use(
    (config) => config,
    (error) => Promise.reject(error)
);

instance.interceptors.request.use(
    (res) => res,
    (error) => Promise.reject(error)
);

export const fetcher = (url: string): Promise<any> => {
    return instance
        .get(url)
        .then((res) => {
            if (!res.data) {
                throw new Error('Failed to fetch data');
            }

            return res.data;
        })
        .catch((error) => {
            throw new Error(error);
        });
};

export default instance;
