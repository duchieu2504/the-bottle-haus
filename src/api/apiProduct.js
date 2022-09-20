import axiosClient from "./axiosClient";
class GetAllApiProdcts {
    getAll = (url) => {
        return axiosClient.get(url);
    };
    getImageProduct = (params) => {
        return axiosClient.get(`products/${params}/image`);
    };
    getSearchProduct = (query) => {
        return axiosClient.get(`search?title=${query}`);
    };

    getProduct = (u) => {};
}
const apiProducts = new GetAllApiProdcts();
export default apiProducts;
