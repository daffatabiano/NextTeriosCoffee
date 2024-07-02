import instance from '@/lib/axios/instance';

const productServices = {
    get: () => instance.get('api/products'),
    upload: () => instance.get('api/products'),
};

export default productServices;
