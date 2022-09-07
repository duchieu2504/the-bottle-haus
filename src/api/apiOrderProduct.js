import axiosClient from "./axiosClient";
class ApiOrderProducts {
    getOrderProducts = (url) => {
        return axiosClient.get(`orderProducts/${url}`);
    };

    getOrderUnpaid = (uid) => {
        return axiosClient.get(`orderProducts/${uid}/unpaid`);
    };

    postOrderProduct = (data) => {
        return axiosClient({
            method: "POST",
            url: "orderProducts/",
            data: data,
        });
    };
    postOrderUnpaid = (uid, data) => {
        return axiosClient({
            method: "POST",
            url: `orderProducts/${uid}/unpaid`,
            data: data,
        });
    };
    patchOrderUnpaid = (uid, data) => {
        return axiosClient({
            method: "PATCh",
            url: `orderProducts/${uid}`,
            data: data,
        });
    };
    patchOrderUnpaidProductIds = (uid, data) => {
        return axiosClient({
            method: "PATCh",
            url: `orderProducts/${uid}/productIds`,
            data: data,
        });
    };
    patchOrderUnpaidDeleteProductId = (uid, data) => {
        return axiosClient({
            method: "PATCh",
            url: `orderProducts/${uid}/deleteProductId`,
            data: data,
        });
    };
}
const apiOrderProducts = new ApiOrderProducts();
export default apiOrderProducts;
