import axiosClient from "./axiosClient";

class ApiReview {
    // lay toan bo danh gia san pham
    getAllReviewProduct = (productId, _page, _limit) => {
        return axiosClient.get(
            `review/${productId}?_limit=${_limit}&_page=${_page}`
        );
    };
    // lay  danh gia san pham cua nguoi dung
    getReviewProductUser = (productId, uid) => {
        return axiosClient.get(`review?productId=${productId}&userId=${uid}`);
    };
    getReviewFeatures = (productId) => {
        return axiosClient.get(`review/${productId}/features`);
    };

    getReviewParameter = (productId) => {
        return axiosClient.get(`review/${productId}/parameter`);
    };
    // gui  danh gia dau tien
    postReview = (productId, data) => {
        return axiosClient({
            method: "POST",
            url: `review/${productId}`,
            data: data,
        });
    };

    // cap nhat danh gia cua người dùng tai 1 san pham
    putReview = (productId, userId, data) => {
        return axiosClient({
            method: "PUT",
            url: `review/${productId}/${userId}`,
            data: data,
        });
    };
}
const apiReview = new ApiReview();
export default apiReview;
