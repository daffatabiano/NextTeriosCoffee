import instance from '../lib/axios/instance';

const getData = {
    products: () => instance.get('api/products'),
};

export default getData;
