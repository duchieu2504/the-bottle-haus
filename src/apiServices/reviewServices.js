import apiReview from "api/apiReview";

export const getAllReviewProduct = async (productId, _page, _limit) => {
    try {
        const res = await apiReview.getAllReviewProduct(
            productId,
            _page,
            _limit
        );
        console.log("Success get review Product", res.data);
        return res.data;
    } catch (err) {
        console.log("Error", err.message);
    }
};
export const getReviewProductUser = async (productId, uid) => {
    try {
        const res = await apiReview.getReviewProductUser(productId, uid);
        return res.data;
    } catch (err) {
        console.log("Error", err.message);
    }
};

export const getReviewParameter = async (productId) => {
    try {
        const res = await apiReview.getReviewParameter(productId);
        return res.data;
    } catch (err) {
        console.log("Error", err.message);
    }
};

// lấy danh sách  reveiw features
export const getReviewFeatures = async (productId) => {
    try {
        const res = await apiReview.getReviewFeatures(productId);
        return res.data;
    } catch (err) {
        console.log("Error", err.message);
    }
};
export const postReviewRequest = async (productId, data) => {
    try {
        await apiReview.postReview(productId, data);
        console.log("Success post review request");
    } catch (err) {
        console.log("Error", err.message);
    }
};

export const putReviewProduct = async (productId, userId, data) => {
    try {
        await apiReview.putReview(productId, userId, data);
        console.log("PUT REVIEW SUCCES");
    } catch (err) {
        console.log("Error", err.message);
    }
};
