import instance from '@/lib/axios/instance';

const productServices = {
    products: () => instance.get('api/products'),
};

export default productServices;
