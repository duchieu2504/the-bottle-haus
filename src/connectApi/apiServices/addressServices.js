import apiAdress from "connectApi/api/apiAdress";

export const getAllAddresses = async (_id) => {
    try {
        const res = await apiAdress.getApiAdress(_id);
        const api = res.data;
        const result = api.map((item) => {
            const {
                billingAddress,
                isDefault,
                email,
                fullName,
                phoneNumber,
                province,
                _id,
            } = item;
            return {
                billingAddress,
                isDefault,
                email,
                fullName,
                phoneNumber,
                province,
                _id,
            };
        });
        return result;
    } catch (err) {
        console.log("lỗi lấy địa chỉ khách hàng");
    }
};

export const getAddressesDefault = async (_id) => {
    try {
        const res = await apiAdress.getApiAdressDefault(_id);
        const api = res.data;
        const result = api.map((item) => {
            const {
                billingAddress,
                isDefault,
                email,
                fullName,
                phoneNumber,
                province,
                _id,
            } = item;
            return {
                billingAddress,
                isDefault,
                email,
                fullName,
                phoneNumber,
                province,
                _id,
            };
        });
        return result[0];
    } catch (err) {
        console.log("lỗi lấy địa chỉ mặc định của khách hàng");
    }
};

export const postApiAdress = async (data) => {
    try {
        const res = await apiAdress.postApiAdress(data);
        return res.data;
        console.log("lưu thành công địa chỉ khách hàng");
    } catch (err) {
        console.log("lỗi lưu địa chỉ khách hàng");
    }
};

export const editApiAdress = async (_id) => {
    try {
        const result = await apiAdress.editApiAdress(_id);
        console.log("Lấy thành công  một địa chỉ khách hàng");
        return result.data;
    } catch (err) {
        console.log("lỗi lấy  địa chỉ khách hàng");
    }
};

export const putApiAdress = async (id, data) => {
    try {
        const result = await apiAdress.putApiAdress(id, data);
        console.log("Cập nhật thành công  một địa chỉ khách hàng");
        return result.data;
    } catch (err) {
        console.log("lỗi cập nhật  địa chỉ khách hàng");
    }
};
