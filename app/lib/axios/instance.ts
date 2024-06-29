import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    'Api-Key': process.env.NEXT_PUBLIC_API_KEY,
    Expires: '0',
};

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: headers,
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

export const fetcher = (url: string) => {
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
