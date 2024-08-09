import instance from '@/lib/axios/instance';

const productServices = {
    get: () => instance.get('api/products'),
    upload: (data: UploadType) =>
        instance.put(
            'api/products',
            { data },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                },
            }
        ),
};

export default productServices;
