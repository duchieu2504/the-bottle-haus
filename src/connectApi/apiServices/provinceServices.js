import apiProvinces from "connectApi/api/apiProvinces";

export const cityApi = async () => {
    try {
        const res = await apiProvinces.getAllprovince(
            "https://provinces.open-api.vn/api/p"
        );
        return res;
    } catch (err) {
        console.log("lỗi sever tỉnh thành phố");
    }
};

export const districtApi = async (params) => {
    try {
        const res = await apiProvinces.getAllprovince(
            `https://provinces.open-api.vn/api/p/${params}?depth=2`
        );
        return res;
    } catch (err) {
        console.log("lỗi sever tỉnh thành phố");
    }
};

export const wardsApi = async (params) => {
    try {
        const res = await apiProvinces.getAllprovince(
            `https://provinces.open-api.vn/api/d/${params}?depth=2`
        );
        return res;
    } catch (err) {
        console.log("lỗi sever tỉnh thành phố");
    }
};

export const getAllDisApi = async () => {
    try {
        const res = await apiProvinces.getAllprovince(
            `https://provinces.open-api.vn/api/d/`
        );
        return res.data;
    } catch (err) {
        console.log("lỗi sever tỉnh thành phố");
    }
};

export const getAllWardsApi = async () => {
    try {
        const res = await apiProvinces.getAllprovince(
            `https://provinces.open-api.vn/api/w/`
        );
        return res;
    } catch (err) {
        console.log("lỗi sever tỉnh thành phố");
    }
};
