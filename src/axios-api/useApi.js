
import api from "./createApi"

export const getProducts = async () => {
    const res = await api.get('/products');
    console.log(res.status);

    return res.data;
}

export const addProduct = async (data) => {
    const res = await api.post('/products', data);
    console.log(res);

    console.log(res.status);
    return res.data;
}

export const updateProduct = async (id, data) => {
    const res = await api.patch(`/products/${id}`, data);
    console.log(res.status);

    return res.data;
}

export const deleteProduct = async (id) => {
    const res = await api.delete(`/products/${id}`);
    // console.log(res.status);
    return res.data;
}